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

    async update(req, res, next) {
    try {
        const { id } = req.params;
        let { name, price, quantity, size, productTypeId, materialId, info } = req.body;
        const product = await Product.findByPk(id);
        if (!product) {
            return next(ApiError.badRequest('Товар не найден'));
        }
        
        product.name = name || product.name;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.size = size || product.size;
        product.productTypeId = productTypeId || product.productTypeId;
        product.materialId = materialId || product.materialId;
        
        if (req.files && req.files.img) {
            const fileName = uuid.v4() + ".jpg";
            req.files.img.mv(path.resolve(__dirname, '..', 'static', fileName));
            product.img = fileName;
        }
        
        await product.save();
        
        if (info) {
            info = JSON.parse(info);
            await ProductInfo.destroy({ where: { productId: id } });
            for (let i of info) {
                await ProductInfo.create({
                    title: i.title,
                    description: i.description,
                    productId: product.id
                });
            }
        }
        
        return res.json(product);
    } catch(e) {
        next(ApiError.badRequest(e.message));
    }
}
}

module.exports = new ProductsController()