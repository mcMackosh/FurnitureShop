const Router = require('express')
const router = new Router()
const Basket = require('../controllers/basketCont')
const checkAuthAndRole = require('../middlewares/checkAuthAndRole')

// checkAuthAndRole(null)
router.post('/createNewOrder',checkAuthAndRole(null),Basket.create)
router.put('/updateOrder',checkAuthAndRole(null),Basket.update)
router.delete('/deleteOrder',Basket.delete)
router.get('/getAllOrders', checkAuthAndRole(null),Basket.getAll)
module.exports = router