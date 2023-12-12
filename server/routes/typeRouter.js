const Router = require('express')
const router = new Router
const GuideController = require('../controllers/GuideController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), GuideController.create)
router.get('/', GuideController.getAll)

module.exports = router