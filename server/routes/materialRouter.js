const Router = require('express')
const materialController = require('../controllers/materialController')
const router = new Router()


router.post('/', materialController.create)
router.get('/', materialController.getAll)

module.exports = router