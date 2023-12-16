const Router = require('express')
const router = new Router
const GuideController = require('../controllers/GuideController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/*', authMiddleware , checkRole(['MANAGER']), GuideController.create)
router.put('/*', authMiddleware , checkRole(['MANAGER']), GuideController.change)
router.get('/', GuideController.get)

module.exports = router