const {Brand} = require('../models/models')
const ApiError = require('../errors/ApiError')

class BrandController {
    async create (req, res, next) {
        const {name} = req.body
        if(!name) return next(ApiError.badRequest('Не введено название бренда'))
        const isSecond = await Brand.findOne({where: {name}})
        if(isSecond) return next(ApiError.badRequest('Такой бренд уже существует'))
        const brand = await Brand.create({name})
        return res.json(brand)
    }
    async getAll (req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

module.exports = new BrandController()