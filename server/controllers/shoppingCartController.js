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
                where: { shoppingCartId: cart.id, productId }
            });
            if (existing) {
                if (existing.quantity !== undefined) {
                    existing.quantity += 1;
                    await existing.save();
                }
                return res.json(existing);
            }

            const cartItem = await CartProduct.create({
                shoppingCartId: cart.id,
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
        if (!user?.id) return res.status(401).json([]);
        const cart = await ShoppingCart.findOne({ where: { userId: user.id } });
        if (!cart) return res.json([]);
        const items = await CartProduct.findAll({
            where: { shoppingCartId: cart.id },
            include: [{ model: Product }]   // обязательно!
        });
        return res.json(items);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: e.message });
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

    async updateQuantity(req, res) {
    try {
        const { id } = req.params;          // id записи CartProduct
        const { quantity } = req.body;
        const user = req.user;

        if (!user?.id) {
            return res.status(401).json({ message: "Не авторизован" });
        }
        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "Количество должно быть не менее 1" });
        }

        // Находим позицию корзины
        const cartItem = await CartProduct.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({ message: "Позиция не найдена" });
        }

        // Проверяем, принадлежит ли позиция текущему пользователю
        const cart = await ShoppingCart.findOne({ where: { userId: user.id } });
        if (!cart || cartItem.shoppingCartId !== cart.id) {
            return res.status(403).json({ message: "Нет доступа к этой позиции" });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        // Возвращаем обновлённую позицию (можно также вернуть всю корзину)
        const updated = await CartProduct.findByPk(id, {
            include: [{ model: Product }]
        });
        return res.json(updated);
    } catch (e) {
        console.error("updateQuantity error:", e);
        return res.status(500).json({ message: e.message });
    }
}
}

module.exports = new ShoppingCartController();