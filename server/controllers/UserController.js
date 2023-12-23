const ApiError = require('../errors/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, ServiceCompany, ClientCompany} = require('../models/models')

const generateJWT = (id, login, role) => {
    return jwt.sign(
        {id, login, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration (req, res, next) {
        const {login, password, role, name, description} = req.body
        if(!login || !password) return next(ApiError.badRequest('Не введён логин/пароль'))
        const candidate = await User.findOne({where: {login}})
        if(candidate) return next(ApiError.badRequest('Пользователь с таким login уже существует'))
        const hashPassword = await bcrypt.hash(password, 5)
        if (role === "SERVICE" || role === "CLIENT") {
            try {
                if(!name || !description) return next(ApiError.badRequest('Требуется название и описание компании'))
                const user = await User.create({login, role, password: hashPassword})
                if (role === "SERVICE") await ServiceCompany.create({userId: user.id, name, description})
                if (role === "CLIENT") await ClientCompany.create({userId: user.id, name, description})
            } catch (error) {
                return next(ApiError.badRequest(error.message))
            }
        }else{
            await User.create({login, role, password: hashPassword})
        }
        
        
        return res.json({data: "success"})
    }
    async login (req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if(!user) return next(ApiError.badRequest('Неверно введён логин/пароль'))
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) return next(ApiError.badRequest('Неверно введён логин/пароль'))
        const token = generateJWT(user.id, user.login, user.role)
        let userName;
        if(user.role === "SERVICE"){
            userName = await ServiceCompany.findOne({where: {userId: user.id}})
        }
        if(user.role === "CLIENT"){
            userName = await ClientCompany.findOne({where: {userId: user.id}})
        }
        if(userName) return res.json({token, username: userName.name})
        else return res.json({token})
    }
    async auth (req, res, next) {
        const {id, login, role} = req.user
        const token = generateJWT(id, login, role)
        let userName = {};
        if(role === "SERVICE"){
            userName = await ServiceCompany.findOne({where: {userId: id}})
        }
        if(role === "CLIENT"){
            userName = await ClientCompany.findOne({where: {userId: id}})
        }
        if(userName) return res.json({token, username: userName.name})

        return res.json({token})
    }
}

module.exports = new UserController()