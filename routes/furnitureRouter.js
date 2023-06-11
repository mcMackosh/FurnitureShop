const Router = require('express')
const router = new Router()
const Furniture = require('../controllers/furnitureCont')
const Comment = require('../controllers/commentCont')
const checkAuthAndRole = require('../middlewares/checkAuthAndRole')


router.post('/createFurniture',checkAuthAndRole('ADMIN'),Furniture.create)
router.put('/updateFurniture',checkAuthAndRole('ADMIN'),Furniture.update)
router.get('/getAllFurniture',Furniture.getAll)
router.get('/getOneFurniture/:id',Furniture.getOne)
router.delete('/deleteFurniture',checkAuthAndRole('ADMIN'),Furniture.delete)


router.post('/createComment',checkAuthAndRole(null) ,Comment.create)
router.delete('/deleteComment',checkAuthAndRole(null), Comment.delete)
router.get('/getComment',Comment.getAll)
module.exports = router