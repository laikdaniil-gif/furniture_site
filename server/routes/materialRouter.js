const Router = require('express')
const materialController = require('../controllers/materialController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRole('ADMIN'), materialController.create)
router.get('/', materialController.getAll)

module.exports = router