import request from 'supertest';
import { app } from '../../app';
import { Password } from '../../services/password';

it('returns a 201 on successful signup', async ()=>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
}, 10000);

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400);
}, 10000);

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtest.com',
            password: 'p'
        })
        .expect(400);
}, 10000);

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com'})
        .expect(400);
    await request(app)
        .post('/api/users/signup')
        .send({password: 'password1'})
        .expect(400);
}, 10000);

it('disallows duplicate emails', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtt@test.com',
            password: 'password'
        })
        .expect(201);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtt@test.com',
            password: 'password'
        })
        .expect(400);
});


/* it('sets a cookie after successful signup', async () =>{
    const response = request(app)
    .post('/api/users/signup')
    .send({
        email: 'testttt@test.com',
        password: 'password'
    })
    .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
}); */