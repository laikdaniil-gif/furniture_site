const { Product, CartProduct, ShoppingCart } = require("../models/models");

class ShoppingCartController {
    async addToCart(req, res, next) {
        try {
            const user = req.user;
            if (!user || !user.id) {
                return res.status(401).json({ message: "Пользователь не авторизован" });
            }
            const { productId } = req.body;
            if (!productId) {
                return res.status(400).json({ message: "Не указан ID товара" });
            }

            let cart = await ShoppingCart.findOne({ where: { userId: user.id } });
            if (!cart) {
                cart = await ShoppingCart.create({ userId: user.id });
            }

            let existing = await CartProduct.findOne({
                where: { ShoppingCartId: cart.id, productId }
            });
            if (existing) {
                if (existing.quantity !== undefined) {
                    existing.quantity += 1;
                    await existing.save();
                }
                return res.json(existing);
            }

            const cartItem = await CartProduct.create({
                ShoppingCartId: cart.id,
                productId,
                quantity: 1
            });
            return res.json(cartItem);
        } catch (e) {
            console.error("Ошибка addToCart:", e);
            return res.status(500).json({ message: "Внутренняя ошибка сервера", error: e.message });
        }
    }

    async getCartUser(req, res) {
        try {
            const user = req.user;
            if (!user || !user.id) {
                return res.status(401).json({ message: "Не авторизован" });
            }
            const cart = await ShoppingCart.findOne({ where: { userId: user.id } });
            if (!cart) {
                return res.json([]);
            }
            const items = await CartProduct.findAll({
                where: { ShoppingCartId: cart.id },
                include: [{ model: Product }]
            });
            return res.json(items);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Ошибка получения корзины" });
        }
    }

    async deleteCart(req, res) {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ message: "Не указан ID позиции" });
            }
            await CartProduct.destroy({ where: { id } });
            return res.status(200).json({ message: "Товар удалён" });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Ошибка удаления" });
        }
    }
}

module.exports = new ShoppingCartController();