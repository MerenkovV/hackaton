const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../errors/ApiError')
const cloud = require('./CloudImage')


    
class DeviceController {
    async create (req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            let {img} = req.files
            const base64 = Buffer.from(img.data).toString('base64')
            const fileURL = await cloud(base64)
            
            const isSecond = await Device.findOne({where: {name}})
            if(isSecond) return next(ApiError.badRequest("Девайс уже существует"))

            const device = await Device.create({name, price, brandId, typeId, img: `${fileURL}`})

            if(info){
                info = JSON.parse(info)
                info.forEach(item => {
                    DeviceInfo.create({
                        title: item.title,
                        description: item.description,
                        deviceId: device.id
                    })
                });
            }

            return res.json(device)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        
    }
    async getAll (req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = (page - 1) * limit
        let devices;
        if(!brandId && !typeId) devices = await Device.findAndCountAll({limit, offset})
        if(brandId && !typeId) devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        if(!brandId && typeId) devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        if(brandId && typeId) devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        return res.json(devices)
    }
    async getOne (req, res) {
        const {id} = req.params
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        })
        return res.json(device)
    }
}

module.exports = new DeviceController()