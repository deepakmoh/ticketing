import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/requst-validation-errors';

const router = express.Router();


router.post('/api/users/signin-new',
    [
        body('email')
           .isEmail()
           .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ],
    async (req: Request, res: Response)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw new RequestValidationError(errors.array());
        }
    }
);

export { router as signinRouter1};