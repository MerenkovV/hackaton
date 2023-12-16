const Router = require('express')
const router = new Router
const brandRouter = require('./brandRouter')
const techniqueRouter = require('./techniqueRouter')
const guideRouter = require('./guideRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')

router.use('/user', userRouter)
router.use('/guide', guideRouter)
router.use('/technique', techniqueRouter)
// router.use('/brand', brandRouter)

// router.use('/basket', basketRouter)

module.exports = router