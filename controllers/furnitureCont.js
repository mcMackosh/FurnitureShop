const { Furniture, FeatureTitle, FeatureValue, FurnitureConfiguration, Category, Producer } = require('../modelsDB/modelsDB')
const ApiError = require('../errorProcess/ApiError')
const uuid = require('uuid')
const path = require('path')
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const seq = require('../dataBase')

class FurnitureCont {
  async create(req, res, next) {

    try {
    const { name, price, categoryId, producerId } = req.body;
    if (producerId == 'undefined') {
      return next(ApiError.badRequest('No set Producer'));
    }
    if (name == '') {
      return next(ApiError.badRequest('No set Name'));
    }
    if (price == 0) {
      return next(ApiError.badRequest('No set Price'));
    }
    const features = JSON.parse(req.body.features)
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return next(ApiError.badRequest('Invalid category ID'));
    }
    for (const feature of features) {
      const { featureValueId } = feature;
      const featureValue = await FeatureValue.findByPk(featureValueId);
      if (featureValueId == 0) {
        continue
      }
      if (!featureValue) {
        return next(ApiError.badRequest(`Invalid feature value ID: ${featureValueId}`));
      }
      const featureTitle = await FeatureTitle.findByPk(featureValue.featureTitleId);
      if (!featureTitle || featureTitle.categoryId != categoryId) {

        return next(ApiError.badRequest(`Invalid feature title for value ID: ${featureValueId}`));

      }
    }

    if (!req.files) {
      next(ApiError.badRequest(`No picture`));
    }
    let { img } = req.files
    let fileName = uuid.v4() + ".jpg"
    img.mv(path.resolve(__dirname, '..', 'imgBase', fileName))
    const furniture = await Furniture.create({ name, price, categoryId, producerId, img: fileName });
    for (const feature of features) {
      const { featureValueId } = feature;
      if (featureValueId == 0) {
        continue
      }
      await FurnitureConfiguration.create({ furnitureId: furniture.id, featureValueId });
    }
    res.status(201).json({ furniture });
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const { id, name, price, categoryId, producerId } = req.body;
      const features = JSON.parse(req.body.features)

      // const features = {};
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return next(ApiError.badRequest('Invalid category ID'));
      }
      if (producerId == 'undefined') {
        return next(ApiError.badRequest('No set Producer'));
      }
      if (name == '') {
        return next(ApiError.badRequest('No set Name'));
      }
      if (price == 0) {
        return next(ApiError.badRequest('No set Price'));
      }
      for (const feature of features) {

        const { featureValueId } = feature;
        const featureValue = await FeatureValue.findByPk(featureValueId);
        if (featureValueId == 0) {
          continue
        }
        if (!featureValue) {
          return next(ApiError.badRequest(`Invalid feature value ID: ${featureValueId}`));
        }
        const featureTitle = await FeatureTitle.findByPk(featureValue.featureTitleId);
        if (!featureTitle || featureTitle.categoryId != categoryId) {

          return next(ApiError.badRequest(`Invalid feature title for value ID: ${featureValueId}`));
        }
      }
      let obj = req.files
      let furniture = {};
      if (obj) {
        let fileName = uuid.v4() + ".jpg"
        obj.img.mv(path.resolve(__dirname, '..', 'imgBase', fileName))

        furniture = await Furniture.update({ name, price, categoryId, producerId, img: fileName }, { where: { id: id } })
      } else { furniture = await Furniture.update({ name, price, categoryId, producerId }, { where: { id: id } }); }

      const data = FurnitureConfiguration.destroy({ where: { furnitureId: id } })
      for (const feature of features) {
        const { featureValueId } = feature;
        if (featureValueId == 0) {
          continue
        }
        await FurnitureConfiguration.create({ furnitureId: id, featureValueId });
      }
      res.status(201).send({ furniture });
    }
    catch (e) {
      next(ApiError.internal(e.message))
    }


  }

  async getAll(req, res, next) {
    try {
    const { categoryId, producer, price, sort, searchItem, page, limit, ...params } = req.query;
    const where = {};
    let subQuerymainparams = ``;
    let sortBy = ``;
    if (categoryId) {
      subQuerymainparams += ` and categoryId = ${categoryId}`;
    }
    if (producer) {
      const producerQueary = producer.split(',').join(' or ');
      subQuerymainparams += ` and producerId = ${producerQueary}`;
    }
    if (price) {
      const [minPrice, maxPrice] = price.split(',');
      subQuerymainparams += ` and price between ${minPrice} and ${maxPrice}`;
    }
    if (searchItem) {
      subQuerymainparams += ` and name like '%${searchItem}%'`;
    }
    if (sort) {
      sortBy += ` order by ${sort.replace('-', ' ')}`;
    }
    let subQuery = '';
    for (const [featureTitleId, featureValueIds] of Object.entries(params)) {
      const featureValueIdsArray = featureValueIds.split(',').map(id => Number(id));
      const featureTitleIdNumber = Number(featureTitleId);
      where[`$feature_values.id$`] = Sequelize.literal(`furniture_configurations.featureValueId`);
      where[`$furniture_configurations.furnitureId$`] = Sequelize.literal(`furnitures.id`);

      subQuery += ` AND EXISTS (SELECT * FROM furniture_configurations
        INNER JOIN feature_values ON furniture_configurations.featureValueId = feature_values.id
        INNER JOIN feature_titles ON feature_values.featureTitleId = feature_titles.id
        WHERE furniture_configurations.furnitureId = furnitures.id
        AND feature_values.id IN (${featureValueIdsArray.join(', ')}))`;
    }
    const currentPage = page || 1;
    const offset = (currentPage - 1) * limit;
    const countSql = `SELECT COUNT(*) as count FROM furnitures WHERE 1=1 ${subQuerymainparams} ${subQuery}`;
    const countResult = await seq.query(countSql, { plain: true });
    const totalCount = countResult.count;
    const dataSql = `SELECT furnitures.id, furnitures.name, furnitures.price, furnitures.rait, furnitures.img FROM furnitures WHERE 1=1 
    ${subQuerymainparams} ${subQuery} ${sortBy} LIMIT ${limit} OFFSET ${offset}`;
    const furnitureData = await seq.query(dataSql, {
      model: Furniture,
      mapToModel: true
    });
    const response = {
      count: totalCount,
      rows: furnitureData,
      pagination: {
        currentPage: currentPage,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
    res.json(response);
    }
    catch (e) {
      next(ApiError.internal(e.message))
    }

  }

  async getOne(req, res, next) {

    try {
      const productId = req.params.id;
      if (!productId) {
        next(ApiError.badRequest('No set productId'))
      }
      const furniture = await Furniture.findByPk(productId, {
        include: [
          {
            model: Category,
            include: [FeatureTitle],
          },
          {
            model: FurnitureConfiguration,
            include: [FeatureValue]
          },
        ],
      });
      const producer = await Producer.findByPk(furniture.producerId)
      const featureTitles = furniture.category.feature_titles;
      const featureValues = furniture.furniture_configurations.map((conf) => conf.feature_value);

      const features = [];
      featureTitles.forEach((title) => {
        const featureValue = featureValues.find((value) => value.featureTitleId === title.id);
        const descriptionId = featureValue ? featureValue.id : 0;
        const description = featureValue ? featureValue.discription : null;
        features.push({ titleId: title.id, title: title.title, descriptionId, description });
      });

      res.status(200).json({
        id: furniture.id,
        name: furniture.name,
        price: furniture.price,
        rait: furniture.rait,
        categoryId: furniture.categoryId,
        producerId: furniture.producerId,
        img: furniture.img,
        category: furniture.category,
        producer: producer,
        features
      });
    }
    catch (e) {
      next(ApiError.internal(e.message))
    }


  }

  async delete(req, res) {

    try {
      const { id } = req.query
      const data = await Furniture.destroy({ where: { id: id } })
      res.status(200).json(data)
    }
    catch (e) {
      next(ApiError.internal(e.message))
    }

  }
}

module.exports = new FurnitureCont()