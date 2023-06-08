const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const ProductImage = require('../models/ProductImage');
require('../models');

let token;
let producId;


beforeAll(async() =>{
    const credentials = {
        email: "testuser@gmail.com",
        password: "1234"
    }
    const res = await request(app).post('/users/login').send(credentials)
    token = res.body.token;
});

test(' POST /create new product ', async () => {
    const categories = await Category.create({ name: "tecnologi" })

    const product = {
        title: "tv",
        description: "tv 30 pulgadas, pantalla plana.",
        brand: "sonny",
        price: "250",
        categoryId: categories.id
    }
    const res = await request(app)
    .post('/products')
    .send(product)
    .set('Authorization', `Bearer ${token}`);
    producId = res.body.id;
    await categories.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /should bring all products ', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /products/:id/images should set the images ', async () => {
    const image = await ProductImage.create({
        url: "http://fail",
        publicId: "false"
    })
    const res = await request(app)
    .post(`/products/${producId}/images`)
    .send([image.id])
    .set('Authorization', `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /product/:id ', async () => {
    const productUpdate = {
        title: "tv lg",
    }
    const res = await request(app)
    .put(`/products/${producId}`)
    .send(productUpdate)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(productUpdate.firstName);
});

test('DELETE /eliminate one product ', async () => {
    const res = await request(app)
    .delete( `/products/${producId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204); 
});