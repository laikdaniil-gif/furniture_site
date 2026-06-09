const Router = require('express')
const productsController = require('../controllers/productsController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), productsController.create)
router.delete('/:id', checkRole('ADMIN'), productsController.delete);
router.get('/', productsController.getAll)
router.get('/:id', productsController.getOne)
router.put('/:id', checkRole('ADMIN'), productsController.update);

module.exports = router