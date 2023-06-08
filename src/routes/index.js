const express = require('express');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const productImgRouter = require('./productImg.router');
const cartRouter = require('./cart.router');
const purchasesRouter = require('./pruchases.router');
const router = express.Router();


router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/products_images', productImgRouter);
router.use('/carts', cartRouter),
router.use('/purchases', purchasesRouter);

module.exports = router;