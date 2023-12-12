const sequelize = require('../db')
const {DataTypes, STRING, INTEGER, DATE, DATEONLY} = require('sequelize')


//Справочники

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: STRING, unique: true},
    password: {type: STRING},
    role: {type: STRING, defaultValue: "USER"},
})

const ServiceCompany = sequelize.define('service_company', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: STRING, allowNull: false},
    description: {type: STRING, allowNull: false},
})

const TechniqueModel = sequelize.define('technique_model', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
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

// const Rating = sequelize.define('rating', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     rate: {type: INTEGER, allowNull: false}
// })



const Device = sequelize.define('device', {
    id: {type: STRING, primaryKey: true},
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

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: STRING, allowNull: false},
    description: {type: STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: STRING, unique: true, allowNull: false},
})

const BrandType = sequelize.define('brand_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Type.belongsToMany(Brand, {through: BrandType})
Brand.belongsToMany(Type, {through: BrandType})

module.exports = {
    User,
    Basket,
    BasketDevice,
    Rating,
    Device,
    DeviceInfo,
    Type,
    Brand,
    BrandType
}