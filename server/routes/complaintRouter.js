const Router = require('express')
const router = new Router
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const ComplaintController = require('../controllers/ComplaintController')

router.post('/', authMiddleware , checkRole(['MANAGER']), ComplaintController.create)
router.get('/', authMiddleware , checkRole(['MANAGER', 'CLIENT', 'SERVICE']), ComplaintController.getAll)

module.exports = router