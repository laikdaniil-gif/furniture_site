const Router = require('express')
const router = new Router()
const productTypesController = require('../controllers/productTypesController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), productTypesController.create)
router.get('/', productTypesController.getAll)

module.exports = router