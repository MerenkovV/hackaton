const Router = require('express')
const router = new Router
const maintenanceRouter = require('./maintenanceRouter')
const techniqueRouter = require('./techniqueRouter')
const guideRouter = require('./guideRouter')
const userRouter = require('./userRouter')
const complaintRouter = require('./complaintRouter')

router.use('/user', userRouter)
router.use('/guide', guideRouter)
router.use('/technique', techniqueRouter)
router.use('/maintenance', maintenanceRouter)
router.use('/complaint', complaintRouter)

module.exports = router