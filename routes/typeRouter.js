const Router = require('express')
const TypeCont = require('../controllers/typeCont')
const checkAuthAndRole = require('../middlewares/checkAuthAndRole')
const router = new Router()


// router.post('/',checkAuthAndRole('ADMIN'),TypeCont.create)
router.post('/',checkAuthAndRole('ADMIN'), TypeCont.create)
router.get('/', TypeCont.getAll)
router.put('/',checkAuthAndRole('ADMIN'), TypeCont.update)
router.get('/:id', TypeCont.getOne)
router.delete('/',checkAuthAndRole('ADMIN'),TypeCont.delete)

module.exports = router