const Router = require('express')
const router = new Router()
const materialRouter = require('./materialRouter')
const userRouter = require('./userRouter')
const productsRouter = require('./productsRouter')
const productTypesRouter = require('./productTypesRouter')


router.use('/user', userRouter)
router.use('/products', productsRouter)
router.use('/productType', productTypesRouter)
router.use('/material', materialRouter)

module.exports = router