const Router = require('express')
const router = new Router
const MaintenanceController = require('../controllers/MaintenanceController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware , checkRole(['MANAGER']), MaintenanceController.create)
router.get('/', authMiddleware , checkRole(['MANAGER', 'CLIENT', 'SERVICE']), MaintenanceController.getAll)

module.exports = router