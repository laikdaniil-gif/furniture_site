const Router = require('express')
const productsController = require('../controllers/productsController.js')
const router = new Router()


router.post('/', productsController.create)
router.get('/', productsController.getAll)
router.get('/:id', productsController.getOne)


module.exports = router