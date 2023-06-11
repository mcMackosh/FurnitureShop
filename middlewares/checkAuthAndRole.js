const jwt = require('jsonwebtoken')

module.exports = (role) =>{
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            let token = req.headers.authorization.split(' ')
            token = token[1]
            if (!token) {
                return res.status(401).json({message: "No auth"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log(decoded)
            if (role !== null && decoded.role !== role) {
                return res.status(403).json({message: "Access denied"})
            }
            req.userData = decoded;
            next()
        } catch (e) {
            res.status(401).json({message: "No auth"})
        }
    };
}