const {Product, ProductInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const uuid = require('uuid')
const path = require('path');
const { info } = require('console');

class ProductsController {
    async create(req, res, next) {
        try {
            let {name, price, quantity, size, productTypeId, materialId, productId} = req.body
                const {img} = req.files
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                
                const product = await Product.create({
                    name,
                    price,
                    quantity,
                    size,
                    productTypeId,
                    materialId,
                    img:fileName,
                    productId
        })
                if (info) {
                    info = JSON.parse(info)
                    info.forEach(i =>
                        ProductInfo.create({
                            title: i.title,
                            description: i.description,
                            productId: product.id,
                        })
                    )
                }

        return res.json(product)
    } catch(e) {
        next(ApiError.badRequest(e.message))
    }}

    async getAll(req, res) {
        let {materialId, productTypeId, limit, page} = req.query
        
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit

        let products;
        if (!materialId && !productTypeId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (materialId && !productTypeId) {
            products = await Product.findAndCountAll({where:{materialId}, limit, offset})
        }
        if (!materialId && productTypeId) {
            products = await Product.findAndCountAll({where:{productTypeId}, limit, offset})
        }
        if (materialId && productTypeId) {
            products = await Product.findAndCountAll({where:{materialId, productTypeId, limit, offset}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where:{id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )
        return res.json(product)
    }
}

module.exports = new ProductsController()