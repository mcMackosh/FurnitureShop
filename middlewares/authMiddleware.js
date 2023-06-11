const jwt = require('jsonwebtoken')

module.exports =  (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const buff = req.headers.authorization.split(' ')
        const token = buff[1] // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({message: "No auth"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded)
        req.userData = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "No auth"})
    }
};