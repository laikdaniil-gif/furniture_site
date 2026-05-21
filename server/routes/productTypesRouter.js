const Router = require('express')
const router = new Router()
const productTypesController = require('../controllers/productTypesController')


router.post('/', productTypesController.create)
router.get('/', productTypesController.getAll)

module.exports = router