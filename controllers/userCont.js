const ApiError = require('../errorProcess/ApiError.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../modelsDB/modelsDB')
const uuid = require('uuid')
const { validationResult } = require('express-validator');

const nodemailer = require('nodemailer')

const createJWT = (id, login, email, role, setIsAuth) => {
    return jwt.sign(
        { id, email, login, role, setIsAuth },
        process.env.SECRET_KEY,
        { expiresIn: '12h' }
    )
}

class MailService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'furnitureshopcmm@gmail.com',
                pass: 'esjzrkyxzdwwdxno'
            }
        });
    }

    async sendActivationMail(to, code) {
        const html = `
        <html>
        <head>
            <style>
                body {
                    background-color: #000;
                    color: #fff;
                    font-family: Arial, sans-serif;
                }
                
                h1 {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                
                p {
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                
                a {
                    color: #fff;
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <h1>Welcome!</h1>
            <p>Thank you for registering at our furniture shop.</p>
            <p>Your activation code: <a href="${code}">${code}</a></p>
            <p>Please click the link below to activate your account.</p>
            <p><a href="${code}">${code}</a></p>
            <p>If you didn't sign up on our website, please ignore this email.</p>
            <p>Best regards,<br>Your Furniture Shop</p>
        </body>
        </html>
    `;
        await this.transporter.sendMail(
            {
                from: 'furnitureshopcmm@gmail.com',
                to,
                subject: "Your code is:",
                text: '',
                html
            })
    }
}


class UserCont {
    async registration(req, res, next) {
        try {
            const s1 = new MailService();
            const { email, login, password, role } = req.body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('No valid data'))
            }
            if (!login || !password) {
                return next(ApiError.badRequest('Uncorect email or password'))
            }
            const check1 = await User.findOne({ where: { login } })
            const check2 = await User.findOne({ where: { email } })
            if (check1 !== null || check2 !== null) {
                return next(ApiError.badRequest('User with this login have been created'))
            }

            const hashPassword = await bcrypt.hash(password, 4)
            const activationLink = uuid.v4();
            const user = await User.create({ email, login, role, password: hashPassword, activationLink, setIsAuth: false })

            await s1.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
            const token = createJWT(user.id, user.login, user.email, user.role, user.setIsAuth)
            return res.json({ token })
        } catch (e) {
            next(ApiError.internal(e))
        }

    }

    async login(req, res, next) {
        try {
            const s1 = new MailService();
            const { email, password } = req.body
            const Oneuser = await User.findOne({ where: { email } })
            if (!Oneuser) {
                return next(ApiError.internal('User not found!'))
            }
            const { id, login, role } = Oneuser

            let comparePassword = bcrypt.compareSync(password, Oneuser.password)
            if (!comparePassword) {
                return next(ApiError.internal('User`s password is uncorect!'))
            }
            if (Oneuser.setIsAuth == false) {
                return next(ApiError.internal('No verification. Please check your mail'))
            }
            const token = jwt.sign({ id, login, email, role }, process.env.SECRET_KEY, { expiresIn: '12h' })

            return res.json({ token })
        } catch (e) {
            next(ApiError.internal(e))
        }

    }


    async check(req, res, next) {
        try {
            let { id, email, login, password, role, setIsAuth } = req.userData
            const data = await User.findOne({ where: { id: id } })
            setIsAuth = data.setIsAuth;
            const token = jwt.sign({ id, login, email, password, role, setIsAuth }, process.env.SECRET_KEY, { expiresIn: '12h' })
            return res.json({ token })
        } catch (e) {
            next(ApiError.internal(e))
        }

    }

    async sendVerificationUser(req, res, next) {
        try {
            const activationLink = req.params.link;
            const user = await User.findOne({ where: { activationLink: activationLink } })
            const token = jwt.sign({ ...user }, process.env.SECRET_KEY, { expiresIn: '12h' })
            if (!user) {
                return next(ApiError.internal('Link are uncorrect'))
            }
            user.setIsAuth = true;
            await user.save()
            return res.redirect(process.env.CLIENT_URL + '/shop')
        } catch (e) {
            next(ApiError.internal(e))
        }

    }

    async getOneUser(req, res) {
        try {
            const { id } = req.params
            const user = await User.findOne({ where: { id: id } })
            const token = jwt.sign({ ...user }, process.env.SECRET_KEY, { expiresIn: '12h' })
            return res.json({ token })
        } catch (e) {
            next(ApiError.internal(e))
        }

    }
}

module.exports = new UserCont()