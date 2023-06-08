const request = require('supertest');
const app = require('../app');

let userId;
let token;

test('POST should ', async () => {
    const user = {
            firstName: "kevin",
            lastName: "villarruel",
            email: "kevin@gmail.com",
            password: "kevin123",
            phone: "0912313"
    }
    const res = await request(app)
        .post('/users')
        .send(user);
    userId = res.body.id;    
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
});

test('should login', async () => {
    const credentials = {
        email: "kevin@gmail.com",
        password: "kevin123",   
    }
    const res = await request(app)
    .post('/users/login')
    .send(credentials)
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});



test('GET/ should bring all user', async () => {
    const res = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}` );
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
});

test('PUT /users/:id edit one user', async () => {
    const userUpdate = {
        firstName: "Daniel",
};
    const res = await request(app)
        .put(`/users/${userId}`)
        .send(userUpdate)
        .set('Authorization', `Bearer ${token}` );
    expect(res.status).toBe(200);    
    expect(res.body.firstName).toBe(userUpdate.firstName);
});



test('POST /users/login error invalid credentials ', async () => {
    const credentials = {
        email: "inkevin@gmail.com",
        password: "kevin123",   
    }
    const res = await request(app)
    .post('/users/login')
    .send(credentials);
    expect(res.status).toBe(401);
});

test('DELETE /users/:id should delete one user ', async () => {
    const res = await request(app)
    .delete(`/users/${userId}`)
    .set('Authorization', `Bearer ${token}` );
    expect(res.status).toBe(204);
    
});