const { Product, CartProduct, ShoppingCart } = require("../models/models")

class ShoppingCartController {

    async addToCart(req,res,next){
        const user = req.user
        const {productId} = req.body
        const cart = await CartProduct.create({ShoppingCartId : user.id, productId : productId})
        return res.json(cart)
    }

    async getCartUser(req,res){
        const {id} = req.user
        const cart = await CartProduct.findAll({include: {
                model: Product
            }, where: {ShoppingCartId: id}})
        if(!cart) res.status(400).json('None Id')
        return res.json(cart)
    }

    async deleteCart (req, res) {
        const {id} = req.body
        if(!id) res.status(400).json('None Id')
            await CartProduct.destroy({where: {id: id}})
        res.status(200).json('Product deleted')
    }

}

module.exports = new ShoppingCartController()