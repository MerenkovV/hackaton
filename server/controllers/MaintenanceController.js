const uuid = require('uuid')
const path = require('path')
const ApiError = require('../errors/ApiError')
const { Machine, ServiceCompany, Maintenance, MaintenanceType } = require('../models/models')

    
class MaintenanceController {
    async create (req, res, next) {
        try {
            const {id, role} = req.user
            let {
                    technique_id, service_id, maintenance_type,
                    maintenance_date, worked, order,
                    date_order
                } = req.body
            if(
                !technique_id || !service_id || !maintenance_type ||
                !maintenance_date || !worked || !order ||
                !date_order
            ){
                return next(ApiError.badRequest("Отсутствуют обязательные параметры"))
            }

            const isSecond = await Maintenance.findOne({where: {order}})
            if(isSecond) return next(ApiError.badRequest("Данный заказ ТО уже внесён"))

            const machineCandidate = await Machine.findOne({where: {id: technique_id}})
            if(!machineCandidate) return next(ApiError.badRequest("Машины с данным id не существует"))

            const serviceCandidate = await ServiceCompany.findOne({where: {id: service_id}})
            if(!serviceCandidate && service_id !== "0") return next(ApiError.badRequest("Сервиса с данным id не существует"))

            if(role === 'CLIENT'){
                let myMachine = await Machine.findAll({where: {userId: id}, attributes: ['id']})
                myMachine = myMachine.map(item=>item.dataValues.id)
                const endArray = myMachine.filter((id)=>id===technique_id)
                if(!endArray) return next(ApiError.badRequest("У вас нет такой техники"))
            }

            const machine = await Maintenance.create({
                date_maintenance: maintenance_date,
                worked,
                order,
                date_order,
                machineId: technique_id,
                serviceCompanyId: service_id,
                maintenanceTypeId: maintenance_type,
            })

            return res.json(machine)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        
    }
    async getAll (req, res) {
        const {id, role} = req.user

        if(role === 'MANAGER'){
            const technicueArray = await Maintenance.findAndCountAll({
                include: [
                    {model: ServiceCompany}, 
                    {model: MaintenanceType},
                ],
                order: [
                    ['date_maintenance', 'ASC']
                ]
            })
            return res.json(technicueArray)
        }

        if(role === 'CLIENT'){
            let myMachine = await Machine.findAll({where: {userId: id}, attributes: ['id']})
            myMachine = myMachine.map(item=>item.dataValues.id)
            const technicueArray = await Maintenance.findAndCountAll({
                where: {machineId: myMachine},
                include: [
                    {model: ServiceCompany}, 
                    {model: MaintenanceType},
                ],
                order: [
                    ['date_maintenance', 'DESC']
                ]
            })
            return res.json(technicueArray)
        }

        if(role === 'SERVICE'){
            const ServiceCheck = await ServiceCompany.findOne({where: {userId: id}})
            const technicueArray = await Maintenance.findAndCountAll({
                where: {serviceCompanyId: ServiceCheck.id},
                include: [
                    {model: ServiceCompany}, 
                    {model: MaintenanceType},
                ],
                order: [
                    ['date_maintenance', 'DESC']
                ]
            })
            return res.json(technicueArray)
        }

        return res.json("Неопознанная роль")
    }
}

module.exports = new MaintenanceController()