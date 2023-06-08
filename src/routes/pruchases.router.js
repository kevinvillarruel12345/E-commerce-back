const { getAll, buyCart } = require('../controllers/purchase.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const purchasesRouter = express.Router();

purchasesRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, buyCart)


module.exports = purchasesRouter;