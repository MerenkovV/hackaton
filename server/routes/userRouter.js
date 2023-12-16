const Router = require('express')
const router = new Router
const upload = require("../middleware/multer");
const UserController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/registration',authMiddleware, checkRoleMiddleware(['MANAGER']), UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.auth)

module.exports = router