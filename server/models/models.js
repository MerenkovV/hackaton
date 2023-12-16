const sequelize = require('../db')
const {STRING, INTEGER, DATEONLY, DataTypes} = require('sequelize')


//Справочники

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: STRING, unique: true},
    password: {type: STRING},
    role: {type: STRING, defaultValue: "USER"},
})

const ServiceCompany = sequelize.define('service_company', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, allowNull: false},
    description: {type: STRING, allowNull: false},
})

const TechniqueModel = sequelize.define('technique_model', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true},
    about: {type: STRING, defaultValue: "Нет описания"}
})

const EngineModel = sequelize.define('engine_model', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true},
    about: {type: STRING, defaultValue: "Нет описания"}
})
const TransmissionModel = sequelize.define('transmission_model', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true},
    about: {type: STRING, defaultValue: "Нет описания"}
})
const DrivingBridgeModel = sequelize.define('driving_bridge_model', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true},
    about: {type: STRING, defaultValue: "Нет описания"}
})
const ControlledBridgeModel = sequelize.define('controlled_bridge_model', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true},
    about: {type: STRING, defaultValue: "Нет описания"}
})
const MaintenanceType = sequelize.define('maintenance_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true},
    about: {type: STRING, defaultValue: "Нет описания"}
})
const RefusalType = sequelize.define('refusal_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true},
    about: {type: STRING, defaultValue: "Нет описания"}
})
const RecoveryMethod = sequelize.define('recovery_method', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true},
    about: {type: STRING, defaultValue: "Нет описания"}
})

// Окончание справочников

const Machine = sequelize.define('machine', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    engine_number: {type: STRING, unique: true, allowNull: false},
    transmission_number: {type: STRING, unique: true, allowNull: false},
    driving_bridge_number: {type: STRING, unique: true, allowNull: false},
    controlled_bridge_number: {type: STRING, unique: true, allowNull: false},
    delivery_number: {type: STRING, unique: true, allowNull: false},
    shipment_date: {type: DATEONLY, allowNull: false},
    end_user: {type: STRING, allowNull: false},
    delivery_address: {type: STRING, allowNull: false},
    equipment: {type: STRING, allowNull: false},
})

const Maintenance = sequelize.define('maintenance', { // ТО
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date_maintenance: {type: DATEONLY, allowNull: false},
    worked: {type: INTEGER, allowNull: false},
    order: {type: STRING, allowNull: false},
    date_order: {type: DATEONLY, allowNull: false},
    
})

const Complaints = sequelize.define('complaints', { // Рекламации
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date_complaints: {type: DATEONLY, allowNull: false},
    worked: {type: INTEGER, allowNull: false},
    description: {type: STRING, allowNull: false},
    spare_parts: {type: STRING, allowNull: false},
    date_repair: {type: DATEONLY, allowNull: false},
    downtime: {type: STRING, allowNull: false},
})

User.hasOne(ServiceCompany)
ServiceCompany.belongsTo(User)

User.hasMany(Machine)
Machine.belongsTo(User)

ServiceCompany.hasMany(Machine)
Machine.belongsTo(ServiceCompany)

TechniqueModel.hasMany(Machine)
Machine.belongsTo(TechniqueModel)

EngineModel.hasMany(Machine)
Machine.belongsTo(EngineModel)

TransmissionModel.hasMany(Machine)
Machine.belongsTo(TransmissionModel)

DrivingBridgeModel.hasMany(Machine)
Machine.belongsTo(DrivingBridgeModel)

ControlledBridgeModel.hasMany(Machine)
Machine.belongsTo(ControlledBridgeModel)

Machine.hasMany(Maintenance)
Maintenance.belongsTo(Machine)

Machine.hasMany(Complaints)
Complaints.belongsTo(Machine)

ServiceCompany.hasMany(Maintenance)
Maintenance.belongsTo(ServiceCompany)

ServiceCompany.hasMany(Complaints)
Complaints.belongsTo(ServiceCompany)

MaintenanceType.hasMany(Maintenance)
Maintenance.belongsTo(MaintenanceType)

RefusalType.hasMany(Complaints)
Complaints.belongsTo(RefusalType)

RecoveryMethod.hasMany(Complaints)
Complaints.belongsTo(RecoveryMethod)

module.exports = {
    User,
    ServiceCompany,
    TechniqueModel,
    EngineModel,
    TransmissionModel,
    DrivingBridgeModel,
    ControlledBridgeModel,
    MaintenanceType,
    RefusalType,
    RecoveryMethod,
    Machine,
    Maintenance,
    Complaints,
}