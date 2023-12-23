const uuid = require('uuid')
const path = require('path')
const ApiError = require('../errors/ApiError')
const { Machine, ServiceCompany, Complaints, RefusalType, RecoveryMethod } = require('../models/models')

    
class ComplaintController {
    async create (req, res, next) {
        try {
            let {
                    date_complaints, worked, refusal_id,
                    description, recovery_id, spare_parts,
                    date_repair, downtime, technique_id,
                    service_id
                } = req.body
            if(
                !date_complaints || !worked || !refusal_id ||
                !description || !recovery_id || !spare_parts ||
                !date_repair || !downtime || !technique_id ||
                !service_id
            ){
                return next(ApiError.badRequest("Отсутствуют обязательные параметры"))
            }

            const machineCandidate = await Machine.findOne({where: {id: technique_id}})
            if(!machineCandidate) return next(ApiError.badRequest("Машины с данным id не существует"))

            const serviceCandidate = await ServiceCompany.findOne({where: {id: service_id}})
            if(!serviceCandidate) return next(ApiError.badRequest("Сервиса с данным id не существует"))

            const machine = await Complaints.create({
                date_complaints,
                worked,
                description,
                spare_parts,
                machineId: technique_id,
                serviceCompanyId: service_id,
                refusalTypeId: refusal_id,
                recoveryMethodId: recovery_id,
                date_repair,
                downtime,
            })

            return res.json(machine)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        
    }
    async getAll (req, res) {
        const {id, role} = req.user

        if(role === 'MANAGER'){
            const complaintsArray = await Complaints.findAndCountAll({
                order: [
                    ['date_complaints', 'ASC']
                ]
            })
            return res.json(complaintsArray)
        }

        if(role === 'CLIENT'){
            let myMachine = await Machine.findAll({where: {userId: id}, attributes: ['id']})
            myMachine = myMachine.map(item=>item.dataValues.id)
            const complaintsArray = await Complaints.findAndCountAll({
                where: {machineId: myMachine},
                order: [
                    ['date_complaints', 'DESC']
                ]
            })
            return res.json(complaintsArray)
        }

        if(role === 'SERVICE'){
            console.log("hey");
            const ServiceCheck = await ServiceCompany.findOne({where: {userId: id}})
            const complaintsArray = await Complaints.findAndCountAll({
                where: {serviceCompanyId: ServiceCheck.id},
                order: [
                    ['date_complaints', 'DESC']
                ]
            })
            return res.json(complaintsArray)
        }

        return res.json("Неопознанная роль")
    }
}

module.exports = new ComplaintController()