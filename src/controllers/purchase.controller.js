const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ProductImage = require("../models/ProductImage");

const getAll = catchError(async (req, res) => {
  const purchase = await Purchase.findAll({
    include: [
      {
        model: Product,
        include: ProductImage,
      },
    ],
    where: { userId: req.user.id },
  });
  return res.json(purchase);
});

const buyCart = catchError(async (req, res) => {
  const userId = req.user.id;
  const carProducts = await Cart.findAll({
    where: { userId },
    attributes: ["userId", "productId", "quantity"],
    raw: true,
  });
  await Purchase.bulkCreate(carProducts);
  await Cart.destroy({ where: { userId } });
  return res.json(carProducts);
});

module.exports = {
  getAll,
  buyCart,
};
