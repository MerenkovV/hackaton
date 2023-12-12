const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

module.exports = async function(req, res, next){
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        const login = decoded.login
        const user = await User.findOne({where: {login}})
        if(!user) return next(ApiError.badRequest('Неверный токен'))
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Не авторизован"})
    }
}