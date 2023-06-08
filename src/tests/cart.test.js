const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models')

let token;
let cartId;

beforeAll(async() =>{
    const credentials = {
        email: "testuser@gmail.com",
        password: "1234",
    }
    const res = await request(app)
        .post('/users/login')
        .send(credentials);
    token = res.body.token;
});

test('POST /should create one product cart ', async () => {
    const product = await Product.create({
        title: "licuadora",
        description: "4 velocidades",
        brand: "TKO",
        price: "50",
    })
    const cart = {
        productId: product.id,
        quantity: 1
    }
    const res = await request(app)
    .post('/carts')
    .send(cart)
    .set('Authorization', `Bearer ${token}`);
    cartId = res.body.id;
    await product.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /should all products cart ', async () => {
    const res = await request(app)
        .get('/carts')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test(' PUT /should edit one product the cart ', async () => {
    
    const cartUpdate = {
        quantity: 3
    }
    const res = await request(app)
    .put(`/carts/${cartId}`)
    .send(cartUpdate)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cartUpdate.quantity);
});

test('DELETE /should eliminate one product the cart ', async () => {
    const res = await request(app)
    .delete(`/carts/${cartId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});