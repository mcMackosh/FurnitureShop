const {Sequelize} = require('sequelize')
require('dotenv').config()
module.exports = new Sequelize
(
    process.env.DB_name,
    process.env.DB_user,
    process.env.DB_pw,
    { 
        host: process.env.DB_host,
        dialect: 'mysql',
        port: process.env.DB_port
    }
)

