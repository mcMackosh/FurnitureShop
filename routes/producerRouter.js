const Router = require('express')
const ProducerCont = require('../controllers/producerCont')
const checkAuthAndRole = require('../middlewares/checkAuthAndRole')
const router = new Router()

router.post('/',checkAuthAndRole('ADMIN'),ProducerCont.create)
router.get('/',ProducerCont.getAll)
router.delete('/',checkAuthAndRole('ADMIN'),ProducerCont.delete)
router.get('/:id',ProducerCont.getOne)

module.exports = router