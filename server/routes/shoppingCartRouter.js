const Router = require('express')
const router = new Router()
const shoppingCartController = require('../controllers/shoppingCartController.js')
const authMiddleware = require('../middleware/authMiddleware.js')

router.get('/', authMiddleware , shoppingCartController.getCartUser)
router.post('/', authMiddleware , shoppingCartController.addToCart)
router.post('/delete' , shoppingCartController.deleteCart)


module.exports = router