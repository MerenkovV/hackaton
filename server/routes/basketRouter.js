const Router = require('express')
const router = new Router
const authMiddleware = require('../middleware/authMiddleware');
const BasketController = require('../controllers/BasketController');

router.post('/', authMiddleware, BasketController.add)
router.put('/', authMiddleware, BasketController.remove)
router.get('/', authMiddleware, BasketController.check)

module.exports = router