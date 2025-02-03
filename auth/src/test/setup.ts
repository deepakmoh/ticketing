import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async ()=>{

    process.env.JWT_KEY = 'asdfgh';

    //mongo = new MongoMemoryServer();
    //const mongoUri = mongo.getUri();
    mongo = await MongoMemoryServer.create(); // Create the in-memory MongoDB server
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});


beforeEach(async () => {
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.collections();
   
      for (let collection of collections) {
        await collection.deleteMany({});
      }
    }
  });

  afterAll(async () => {
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
  });


  global.signin = async () =>{

    const signupResponse = await request(app)
      .post('/api/users/signup')
      .send({
          email: 'akira50@akira.com',
          password: 'password'
      })
            .expect(201);

      
            const cookie = signupResponse.get("Set-Cookie");
 
            if (!cookie) {
              throw new Error("Failed to get cookie from response");
            }
            return cookie;
  };