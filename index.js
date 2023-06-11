const express = require('express')
const modelsDB = require('./modelsDB/modelsDB')
const sequelize = require('./dataBase')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const application = express()
require('dotenv').config()
const router = require('./routes/index')
const errorHandling = require('./middlewares/ErrorHandlingMiddleWare')
const path = require('path')
const cookieParser = require('cookie-parser')
// const PORT = process.env.PORT

application.use(cors())
application.use(express.json())
application.use(fileUpload({}))
application.use(express.static(path.resolve(__dirname, 'imgBase')))
application.use('/api',router)
// application.use(express.static(path.resolve(__dirname,'static')))

application.use(errorHandling)

const start = async () =>
{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        application.listen(process.env.PORT || 443, ()=>{console.log(`Server has been started ${process.env.PORT}`)})
    }
    catch(e)
    {
        console.log(e)
    }
}
start()

