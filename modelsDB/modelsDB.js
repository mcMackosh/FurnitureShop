const sequelize = require('../dataBase')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: false},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    activationLink: {type: DataTypes.STRING},
    setIsAuth: {type: DataTypes.STRING},
})

const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING},
})

// const Furniture = sequelize.define('furniture',{
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING,allowNull: false},
//     price: {type: DataTypes.INTEGER,allowNull: false},
//     rait: {type: DataTypes.INTEGER,defaultValue: 0},
//     img: {type: DataTypes.STRING,allowNull: false}
// })

// const Type = sequelize.define('type',{
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, allowNull: false}
// })

const Producer = sequelize.define('producer',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const Comment = sequelize.define('comment',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rait: {type: DataTypes.INTEGER, allowNull: false},
    text: {type: DataTypes.TEXT, allowNull: false},
})

// const Feature = sequelize.define('feature',{
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     mainFeatureId: {type: DataTypes.INTEGER, allowNull: true},
//     title: {type: DataTypes.STRING, allowNull: false},
//     description: {type: DataTypes.STRING, allowNull: false},
// })

// Test filter architectre

const Furniture = sequelize.define('furnitures',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,allowNull: false},
    price: {type: DataTypes.INTEGER,allowNull: false},
    rait: {type: DataTypes.INTEGER,defaultValue: 0},
    img: {type: DataTypes.STRING,allowNull: false}
})

const Category = sequelize.define('category',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const FeatureTitle = sequelize.define('feature_title',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING,allowNull: false}
})

const FeatureValue = sequelize.define('feature_value',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    discription: {type: DataTypes.STRING, allowNull: false}
})

const FurnitureConfiguration = sequelize.define('furniture_configuration',{
})

// Test filter architectre

Category.hasMany(Furniture,{
    onDelete: 'CASCADE' 
  })
Furniture.belongsTo(Category)

Category.hasMany(FeatureTitle,{
    onDelete: 'CASCADE' 
  })
FeatureTitle.belongsTo(Category)

Furniture.hasMany(FurnitureConfiguration,{
    onDelete: 'CASCADE' 
  })
FurnitureConfiguration.belongsTo(Furniture)

FeatureTitle.hasMany(FeatureValue,{
    onDelete: 'CASCADE' 
  })
FeatureValue.belongsTo(FeatureTitle)

FeatureValue.hasMany(FurnitureConfiguration,{
    onDelete: 'CASCADE' 
})

FurnitureConfiguration.belongsTo(FeatureValue)

//
User.hasOne(Basket)
Basket.belongsTo(User)

Producer.hasMany(Furniture,{
    onDelete: 'CASCADE' 
})

Furniture.belongsTo(Producer)

User.hasMany(Comment)
Comment.belongsTo(User)

Furniture.hasMany(Comment,{ 
    onDelete: 'CASCADE' })
Comment.belongsTo(Furniture)

Furniture.hasMany(Basket,{ 
    onDelete: 'CASCADE' })
Basket.belongsTo(Furniture)






module.exports = {
    User,
    Basket,
    Producer,
    Comment,
    Furniture,
    FeatureTitle,
    Category,
    FeatureValue,
    FurnitureConfiguration
}







