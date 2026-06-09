const { Order, OrderProduct, CartProduct, Product, ShoppingCart } = require("../models/models");
const ApiError = require('../error/ApiError');

class OrderController {
    async addOrder(req, res, next) {
        try {
            const userId = req.user.id;
            const { phone, postcode, address } = req.body;

            const cart = await ShoppingCart.findOne({ where: { userId } });
            if (!cart) {
                return next(ApiError.badRequest("Корзина не найдена"));
            }

            const cartItems = await CartProduct.findAll({
                where: { ShoppingCartId: cart.id },
                include: [{ model: Product }]
            });

            if (cartItems.length === 0) {
                return next(ApiError.badRequest("Корзина пуста"));
            }

            const order = await Order.create({
                userId: userId,
                phone: phone,
                postcode: postcode,
                address: address,
                status: 1
            });

            for (const item of cartItems) {
                const quantity = item.quantity || 1;
                await OrderProduct.create({
                    orderId: order.id,
                    productId: item.productId,
                    quantity: quantity,
                    priceAtPurchase: item.product.price
                });
            }

            // 5. Очищаем корзину
            await CartProduct.destroy({ where: { ShoppingCartId: cart.id } });

            return res.status(201).json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    //Админская часть

    async getAll(req, res) {
        const orders = await Order.findAll();
        return res.json(orders);
    }

    async getUserOrder(req, res) {
        const { id } = req.params;
        const orders = await Order.findAll({ where: { userId: id } });
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
        if (!order) {
            return res.status(404).json({ message: "Заказ не найден" });
        }
        return res.json(order);
    }

    async updateUserOrder(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: "Заказ не найден" });
        }
        order.status = status;
        await order.save();
        return res.json(order);
    }
}

module.exports = new OrderController();