const {Type} = require('../models/models')
const ApiError = require('../errors/ApiError')

class TypeController {
    async create (req, res, next) {
        const {name} = req.body
        if(!name) return next(ApiError.badRequest('Не введено название типа'))
        const isSecond = await Type.findOne({where: {name}})
        if(isSecond) return next(ApiError.badRequest('Такой тип уже существует'))
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll (req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()