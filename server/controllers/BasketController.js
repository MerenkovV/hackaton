const { BasketDevice, Device } = require("../models/models")
const ApiError = require('../errors/ApiError')

class BasketController {
    async check (req, res, next) {
        const userId = req.user.id
        let devicesArray = await BasketDevice.findAll({where: {basketId: userId}})
        let device = []
        for(let i = 0; i < devicesArray.length; i++){
            device[i] = await Device.findOne({where: devicesArray[i].deviceId})
        }
        return res.json(device)
    }
    async add (req, res, next) {
        const userId = req.user.id
        const {deviceId} = req.body
        if(!deviceId) return next(ApiError.badRequest('Не введён номер девайса'))
        const toBasket = await BasketDevice.create({basketId: userId, deviceId: Number(deviceId)})
        return res.json(toBasket)
    }
    async remove (req, res, next) {
        const userId = req.user.id
        const {deviceId} = req.body
        if(!deviceId) return next(ApiError.badRequest('Не введён номер девайса'))
        const toBasket = await BasketDevice.destroy({where: {basketId: userId, deviceId: Number(deviceId)}})
        return res.json(toBasket)
    }
}

module.exports = new BasketController()