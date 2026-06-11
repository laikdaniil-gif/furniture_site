const sequalize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequalize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING,},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Order = sequalize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING,  allowNull: false},
    postcode: {type: DataTypes.STRING, allowNull: false},
    addressee: {type: DataTypes.STRING, allowNull: false},
    status:{type: DataTypes.INTEGER, defaultValue: 1}
})

const OrderProduct = sequalize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    priceAtPurchase: { type: DataTypes.INTEGER, allowNull: false }
})

const ShoppingCart = sequalize.define('shopping_cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CartProduct = sequalize.define('cart_product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false }
});

const Product = sequalize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    size: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true},
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
    description: {type: DataTypes.TEXT},
})

const MaterialProductType = sequalize.define('material_product_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(ShoppingCart)
ShoppingCart.belongsTo(User)

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderProduct, { foreignKey: 'orderId' });
OrderProduct.belongsTo(Order, { foreignKey: 'orderId' });

Order.hasOne(User);
User.belongsTo(Order);

ShoppingCart.hasMany(CartProduct, { foreignKey: 'shoppingCartId' });
CartProduct.belongsTo(ShoppingCart, { foreignKey: 'shoppingCartId' });

CartProduct.hasOne(ProductInfo)
ProductInfo.belongsTo(CartProduct)

ProductType.hasMany(Product)
Product.belongsTo(ProductType)

Material.hasMany(Product)
Product.belongsTo(Product)

Product.hasMany(CartProduct, { foreignKey: 'productId' });
CartProduct.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

Product.hasMany(OrderProduct, { foreignKey: 'productId' });
OrderProduct.belongsTo(Product, { foreignKey: 'productId' });

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
    MaterialProductType,
    Order,
    OrderProduct
}