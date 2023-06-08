const request = require('supertest');
const app = require('../app');

let categoryId;
let token;

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

test('POST/create one category ', async () => {
    const category = {
        name: "phones",
    }
    const res = await request(app)
    .post('/categories')
    .send(category)
    .set('Authorization', `Bearer ${token}`);
    categoryId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET/should bring all categories ', async () => {
    const res = await request(app)
    .get('/categories')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT/categories/:id ', async () => {
    const categoryUpdate = {
        name: "cell",
    }
    const res = await request(app)
    .put(`/categories/${categoryId}`)
    .send(categoryUpdate)
    .set('Authorization', `Bearer ${token}` );
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(categoryUpdate.firstName);
});

test('DELETE /eliminate one category/:id ', async () => {
    const res = await request(app)
    .delete(`/categories/${categoryId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});