const Router = require('express')
const router = new Router
const TechniqueController = require('../controllers/TechniqueController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware , checkRole(['MANAGER']), TechniqueController.create)
router.get('/', authMiddleware , checkRole(['MANAGER', 'CLIENT', 'SERVICE']), TechniqueController.getAll)
router.get('/:id', TechniqueController.getOne)

module.exports = router