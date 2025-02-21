import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signin out', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'akira50@akira.com',
            password: 'password'
        })
        .expect(201)

       const response = await request(app)
            .post('/api/users/signout')
            .send({})
        .expect(200);


        //console.log(response.get('Set-Cookie'));
        //expect(response.get('Set-Cookie')[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
        //expect(response.get('Set-Cookie')).toBeDefined();

        const cookie = response.get("Set-Cookie");
  if (!cookie) {
    throw new Error("Expected cookie but got undefined.");
  }
 
  expect(cookie[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});