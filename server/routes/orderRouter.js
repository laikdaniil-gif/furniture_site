const Router = require('express');
const router = new Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', authMiddleware, orderController.addOrder);
router.get('/', checkRole('ADMIN'), orderController.getAll);
router.get('/user/:id', authMiddleware, orderController.getUserOrder);
router.get('/:id', authMiddleware, orderController.getOne);
router.put('/:id', checkRole('ADMIN'), orderController.updateUserOrder);
router.delete('/:id', checkRole('ADMIN'), orderController.deleteOrder);

module.exports = router;