const { Type, Category, FeatureTitle, FeatureValue } = require('../modelsDB/modelsDB')
const ApiError = require('../errorProcess/ApiError')
class CategoryCpont {
    async create(req, res, next) {
        try {
            const { name, parameters } = req.body
            let category = await Category.create({ name })
            for (const parameter of parameters) {
                let featureTitle = await FeatureTitle.create({ title: parameter.title, categoryId: category.id })
                for (const value of parameter.values) {
                    await FeatureValue.create({ featureTitleId: featureTitle.id, discription: value })
                };
            };
            return res.json({ id: category.id, name: category.name })
        } catch (e) {
            next(ApiError.internal(e.message))
        }


    }


    async getAll(req, res, next) {
        try {
            const type = await Category.findAll()
            let data = []
            for (let one of type) {
                let id = one.id
                let category = await Category.findOne({ where: { id: id } });
                let featureTitles = await FeatureTitle.findAll({ where: { categoryId: id } });

                category.parametrs = [];

                for (let i = 0; i < featureTitles.length; i++) {
                    let featureValues = await FeatureValue.findAll({ where: { featureTitleId: featureTitles[i].id } });

                    let values = featureValues.map(obj => {
                        delete obj.featureTitleId;
                        return obj;
                    });
                    category.parametrs.push({ title: featureTitles[i].title, id: featureTitles[i].id, values: values });
                }

                let result = { id: category.id, name: category.name, parametrs: [] };

                for (let i = 0; i < category.parametrs.length; i++) {
                    result.parametrs.push({ title: category.parametrs[i].title, id: featureTitles[i].id, values: category.parametrs[i].values });
                }
                data.push(result)

            }
            res.json(data)
        } catch (e) {
            next(ApiError.internal(e.message))
        }

    }

    async delete(req, res, next) {
       
        try {
            const { id } = req.query
            const data = await Category.destroy({ where: { id: id } })
            res.status(200).json(data)
        }catch (e) {
            next(ApiError.internal(e.message))
        }

    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            let category = await Category.findOne({ where: { id: id } });
            let featureTitles = await FeatureTitle.findAll({ where: { categoryId: id } });

            category.parametrs = [];

            for (let i = 0; i < featureTitles.length; i++) {
                let featureValues = await FeatureValue.findAll({ where: { featureTitleId: featureTitles[i].id } });
                const res = JSON.parse(JSON.stringify(featureValues));
                let values = res.map(obj => {
                    delete obj.featureTitleId;
                    delete obj.updatedAt;
                    delete obj.createdAt;
                    return obj;
                });
                category.parametrs.push({ id: featureTitles[i].id, title: featureTitles[i].title, values: values });

            }

            let result = { id: category.id, name: category.name, parametrs: [] };

            for (let i = 0; i < category.parametrs.length; i++) {
                result.parametrs.push({ id: featureTitles[i].id, title: category.parametrs[i].title, values: category.parametrs[i].values });
            }

            
            return res.json(result);
        } catch (e) {
            next(ApiError.internal(e.message))
        }


    }

    async update(req, res, next) {
        try {
            const { id, name, parametrs } = req.body;

            console.log(JSON.parse(JSON.stringify(req.body)))
            await Category.update({ name }, { where: { id } });
            async function ValueDataProcessing(parametr) {
                for (const value of parametr.values) {
                    switch (value.status) {
                        case 'update':
                            await FeatureValue.update(
                                { discription: value.discription },
                                { where: { id: value.id } }
                            );
                            break;
                        case 'create':
                            await FeatureValue.create({
                                discription: value.discription,
                                featureTitleId: parametr.id,
                            }
                            );
                            break;
                        case 'delete':
                            await FeatureValue.destroy({ where: { id: value.id } });
                            break;
                    }
                }

            }
            
            for (const parametr of parametrs) {
                
                switch (parametr.status) {
                    case 'update':
                        if (parametr.title) {
                            await FeatureTitle.update({ title: parametr.title }, { where: { id: parametr.id } });
                        }

                        ValueDataProcessing(parametr)

                        break;

                    case 'create':
                        if (parametr.title) {
                            const newFeatureTitle = await FeatureTitle.create({
                                title: parametr.title,
                                categoryId: id,
                            });
                            parametr.id = newFeatureTitle.id
                            ValueDataProcessing(parametr)
                        }
                        break;

                    case 'delete':
                        console.log('delete')
                        await FeatureTitle.destroy({ where: { id: parametr.id } })
                        
                        break;
                }
            }

            res.status(200).json({ message: 'Data has been added' });
        } catch (error) {
            next(ApiError.internal('Error process data:'))
        }

        
    }
}

module.exports = new CategoryCpont()