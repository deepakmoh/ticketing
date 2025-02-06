import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { Request, Response, NextFunction } from "express";
import { errorHandler, NotFoundError } from "@deepakmoh1/common";


import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { signinRouter1 } from './routes/signin-new';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
    
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signOutRouter);
app.use(signupRouter);
app.use(signinRouter1);


 

app.all('*', async (req, res)=>{
    throw new NotFoundError();
});


app.use(errorHandler);

export { app };