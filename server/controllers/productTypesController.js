const {ProductType} = require('../models/models')
const ApiError = require('../error/ApiError');

class ProductTypesController {
    async create(req, res) {
        const {name} = req.body
        const productType = await ProductType.create({name})
        return res.json(productType)
    }

    async getAll(req, res) {
        const productTypes = await ProductType.findAll()
        return res.json(productTypes)
    }
}

module.exports = new ProductTypesController()