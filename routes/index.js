const Router = require('express')
const router = new Router()

const furnitureRouter = require('./furnitureRouter')
const producerRouter = require('./producerRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')


router.use('/user',userRouter)
router.use('/type',typeRouter)
router.use('/producer',producerRouter)
router.use('/furniture',furnitureRouter)
router.use('/basket',basketRouter)

module.exports = router