const Router = require('express')
const router = new Router()
const UserCont = require('../controllers/userCont')
const checkAuthAndRole = require('../middlewares/checkAuthAndRole')
const {body} = require('express-validator');

router.post('/registration', body('email').isEmail(),
    body('password').isLength({min: 6, max: 24}), 
    UserCont.registration)
router.post('/login',UserCont.login)
router.get('/activate/:link',UserCont.sendVerificationUser)
router.get('/auth', checkAuthAndRole(null), UserCont.check)
router.get('/oneUser/:id', UserCont.getOneUser)
module.exports = router