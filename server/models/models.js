const sequalize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequalize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING,},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const ShoppingCart = sequalize.define('shopping_cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CartProduct = sequalize.define('cart_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Product = sequalize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    size: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const ProductType = sequalize.define('product_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Material = sequalize.define('material', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const ProductInfo = sequalize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING},
})

const MaterialProductType = sequalize.define('material_product_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(ShoppingCart)
ShoppingCart.belongsTo(User)

ShoppingCart.hasMany(CartProduct)
CartProduct.belongsTo(ShoppingCart)

CartProduct.hasOne(ProductInfo)
ProductInfo.belongsTo(CartProduct)

ProductType.hasMany(Product)
Product.belongsTo(ProductType)

Material.hasMany(Product)
Product.belongsTo(Product)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)

ProductType.belongsToMany(Material, {through: MaterialProductType})
Material.belongsToMany(ProductType, {through: MaterialProductType})

module.exports = {
    User,
    ShoppingCart,
    CartProduct,
    Product,
    ProductType,
    Material,
    ProductInfo,
    MaterialProductType
}