const uuid = require('uuid')
const path = require('path')
const ApiError = require('../errors/ApiError')
const { Machine, User, ServiceCompany, TechniqueModel, EngineModel, TransmissionModel, DrivingBridgeModel, ControlledBridgeModel } = require('../models/models')

    
class TechniqueController {
    async create (req, res, next) {
        try {
            let {
                    technique_model, engine_model, engine_number,
                    transmission_model, transmission_number, driving_model, 
                    driving_number, controlled_model, controlled_number, 
                    delivery_number, shipment_date, end_user, 
                    delivery_address, equipment, client_id, service_id,
                    technique_id
                } = req.body
            if(
                !technique_model || !engine_model || !engine_number ||
                !transmission_model || !transmission_number || !driving_model ||
                !driving_number || !controlled_model || !controlled_number ||
                !delivery_number || !shipment_date || !end_user ||
                !delivery_address || !equipment || !client_id || !service_id
                || !technique_id
            ){
                return next(ApiError.badRequest("Отсутствуют обязательные параметры"))
            }

            const isSecond = await Machine.findOne({where: {id: technique_id}})
            if(isSecond) return next(ApiError.badRequest("Данное оборудование уже зарегистрировано"))

            const userCandidate = await User.findOne({where: {id: client_id}})
            if(!userCandidate) return next(ApiError.badRequest("Пользователя с данным id не существует"))
            if(userCandidate.role !== "CLIENT") return next(ApiError.badRequest("Пользователь не является клиентом"))

            const serviceCandidate = await ServiceCompany.findOne({where: {id: service_id}})
            if(!serviceCandidate) return next(ApiError.badRequest("Пользователя с данным id не существует"))

            const machine = await Machine.create({
                id: technique_id,
                techniqueModelId: technique_model,
                engineModelId: engine_model,
                engine_number,
                transmissionModelId: transmission_model,
                transmission_number,
                drivingBridgeModelId: driving_model,
                driving_bridge_number: driving_number,
                controlledBridgeModelId: controlled_model,
                controlled_bridge_number: controlled_number,
                delivery_number,
                shipment_date,
                end_user,
                delivery_address,
                equipment,
                userId: client_id,
                serviceCompanyId: service_id
            })

            return res.json(machine)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        
    }
    async getAll (req, res) {
        const {id, role} = req.user

        if(role === 'MANAGER'){
            const technicueArray = await Machine.findAndCountAll({
                include: [
                    {model: ServiceCompany}, 
                    {model: TechniqueModel},
                    {model: EngineModel}, 
                    {model: TransmissionModel},
                    {model: DrivingBridgeModel}, 
                    {model: ControlledBridgeModel},
                ],
                order: [
                    ['id', 'DESC']
                ]
            })
            return res.json(technicueArray)
        }

        if(role === 'CLIENT'){
            const technicueArray = await Machine.findAndCountAll({where: {userId: id}})
            return res.json(technicueArray)
        }

        if(role === 'SERVICE'){
            const ServiceID = await ServiceCompany.findOne({where: {userId: id}})
            const technicueArray = await Machine.findAndCountAll({where: {serviceCompanyId: ServiceID.id}})
            return res.json(technicueArray)
        }

        return res.json(devices)
    }
    async getOne (req, res, next) {
        try{
            const {id} = req.params

            if(!id) return next(ApiError.badRequest("Не введён id"))

            const machine = await Machine.findOne({where: {id}, 
                include: [
                    {model: TechniqueModel},
                    {model: EngineModel}, 
                    {model: TransmissionModel},
                    {model: DrivingBridgeModel}, 
                    {model: ControlledBridgeModel},
                ]
            })

            return res.json({
                "id": machine.id,
                "techniqueModelId": machine.techniqueModelId,
                "engineModelId": machine.engineModelId,
                "engine_number": machine.engine_number,
                "transmissionModelId": machine.transmissionModelId,
                "transmission_number": machine.transmission_number,
                "drivingBridgeModelId": machine.drivingBridgeModelId,
                "driving_bridge_number": machine.driving_bridge_number,
                "controlledBridgeModelId": machine.controlledBridgeModelId,
                "controlled_bridge_number": machine.controlled_bridge_number,
                "dictionary": {
                    "technique_model": machine.technique_model,
                    "engine_model": machine.engine_model,
                    "transmission_model": machine.transmission_model,
                    "driving_bridge_model": machine.driving_bridge_model,
                    "controlled_bridge_model": machine.controlled_bridge_model,
                }
            })
        }catch(error){
            return next(ApiError.badRequest(error.message))
        }
        
    }
}

module.exports = new TechniqueController()