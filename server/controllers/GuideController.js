const {TechniqueModel, EngineModel, TransmissionModel, DrivingBridgeModel, ControlledBridgeModel, MaintenanceType, RefusalType, RecoveryMethod} = require('../models/models')
const ApiError = require('../errors/ApiError')

class GuideController {
    async create (req, res, next) {
        
        const {name, about} = req.body
        if(!name) return next(ApiError.badRequest('Не введено название типа'))
        let isSecond = undefined, guide = undefined;
        
        switch (req.url) {
            case '/technique':
                isSecond = await TechniqueModel.findOne({where: {name}})
                if(isSecond) return next(ApiError.badRequest('Уже существует'))
                guide = await TechniqueModel.create({name, about})
                break;

            case '/engine':
                isSecond = await EngineModel.findOne({where: {name}})
                if(isSecond) return next(ApiError.badRequest('Уже существует'))
                guide = await EngineModel.create({name, about})
                break;

            case '/transmission':
                isSecond = await TransmissionModel.findOne({where: {name}})
                if(isSecond) return next(ApiError.badRequest('Уже существует'))
                guide = await TransmissionModel.create({name, about})
                break;

            case '/driving':
                isSecond = await DrivingBridgeModel.findOne({where: {name}})
                if(isSecond) return next(ApiError.badRequest('Уже существует'))
                guide = await DrivingBridgeModel.create({name, about})
                break;

            case '/controlled':
                isSecond = await ControlledBridgeModel.findOne({where: {name}})
                if(isSecond) return next(ApiError.badRequest('Уже существует'))
                guide = await ControlledBridgeModel.create({name, about})
                break;

            case '/maintenance':
                isSecond = await MaintenanceType.findOne({where: {name}})
                if(isSecond) return next(ApiError.badRequest('Уже существует'))
                guide = await MaintenanceType.create({name, about})
                break;

            case '/refusal':
                isSecond = await RefusalType.findOne({where: {name}})
                if(isSecond) return next(ApiError.badRequest('Уже существует'))
                guide = await RefusalType.create({name, about})
                break;

            case '/recovery':
                isSecond = await RecoveryMethod.findOne({where: {name}})
                if(isSecond) return next(ApiError.badRequest('Уже существует'))
                guide = await RecoveryMethod.create({name, about})
                break;
                
            default:
                return next(ApiError.badRequest('Неверный путь запроса'))
        }
        
        return res.json(guide)
    }
    async get (req, res) {
        const {technique, engine, transmission, driving, controlled, maintenance, refusal, recovery} = req.query
        console.log(technique);
        let resultObject = {}
        if(technique) resultObject['technique'] = await TechniqueModel.findOne({where: {id: technique}})
        if(engine) resultObject['engine'] = await EngineModel.findOne({where: {id: engine}})
        if(transmission) resultObject['transmission'] = await TransmissionModel.findOne({where: {id: transmission}})
        if(driving) resultObject['driving'] = await DrivingBridgeModel.findOne({where: {id: driving}})
        if(controlled) resultObject['controlled'] = await ControlledBridgeModel.findOne({where: {id: controlled}})
        if(maintenance) resultObject['maintenance'] = await MaintenanceType.findOne({where: {id: maintenance}})
        if(refusal) resultObject['refusal'] = await RefusalType.findOne({where: {id: refusal}})
        if(recovery) resultObject['recovery'] = await RecoveryMethod.findOne({where: {id: recovery}})

        return res.json(resultObject)
    }
}

module.exports = new GuideController()