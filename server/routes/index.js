const Router = require('express')
const router = new Router
const brandRouter = require('./brandRouter')
const deviceRouter = require('./deviceRouter')
const guideRouter = require('./guideRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')

router.use('/user', userRouter)
router.use('/guide', guideRouter)
// router.use('/brand', brandRouter)
// router.use('/device', deviceRouter)
// router.use('/basket', basketRouter)

module.exports = router