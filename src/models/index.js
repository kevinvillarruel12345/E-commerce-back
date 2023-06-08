const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImage = require("./ProductImage");
const Purchase = require("./Purchase");
const User = require("./User");

Category.hasMany(Product);
Product.belongsTo(Category);


Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);

Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Cart);
Cart.belongsTo(User);


Product.hasMany(Purchase);
Purchase.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);