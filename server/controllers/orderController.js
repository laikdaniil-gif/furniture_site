const { Order, OrderProduct, CartProduct, Product, ShoppingCart } = require("../models/models");
const ApiError = require('../error/ApiError');

class OrderController {
    async addOrder(req, res, next) {
    try {
        const userId = req.user.id;
        const { phone, postcode, address } = req.body;

        const cart = await ShoppingCart.findOne({ where: { userId } });
        if (!cart) return next(ApiError.badRequest("Корзина не найдена"));

        const cartItems = await CartProduct.findAll({
            where: { shoppingCartId: cart.id },
            include: [{ model: Product }]
        });
        if (cartItems.length === 0) return next(ApiError.badRequest("Корзина пуста"));

        const order = await Order.create({
            userId,
            phone,
            postcode,
            addressee: address,
            status: 1
        });


        for (const item of cartItems) {
            await OrderProduct.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity || 1,
                priceAtPurchase: item.product.price
            });
        }

        await CartProduct.destroy({ where: { shoppingCartId: cart.id } });

        const fullOrder = await Order.findByPk(order.id, {
            include: [{ model: OrderProduct, include: [Product] }]
        });
        return res.status(201).json(fullOrder);
    } catch (e) {
        console.error(e);
        return next(ApiError.badRequest(e.message));
    }
}

    async getAll(req, res) {
        const orders = await Order.findAll();
        return res.json(orders);
    }

async getUserOrder(req, res) {
    const { id } = req.params; // id пользователя
    const orders = await Order.findAll({
        where: { userId: id },
        include: [{
            model: OrderProduct,
            include: [Product]
        }],
        order: [['createdAt', 'DESC']]
    });
    return res.json(orders);
}

    async getOne(req, res) {
        const { id } = req.params;
        const order = await Order.findOne({
            where: { id },
            include: [{
                model: OrderProduct,
                include: [{ model: Product }]
            }]
        });
        if (!order) return res.status(404).json({ message: "Заказ не найден" });
        return res.json(order);
    }

    async updateUserOrder(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByPk(id);
        if (!order) return res.status(404).json({ message: "Заказ не найден" });
        order.status = status;
        await order.save();
        return res.json(order);
    }
}

module.exports = new OrderController();