import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

dotenv.config();

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({message: 'Token not provided'});
    }

    const [, token] = authHeader.split(' '); // `bearrer token` -> ['bearrer', 'token']

    try {
        const payload: any = jwt.verify(token, process.env.APP_SECRET)
   
        req.userId = payload.userId;

        return next();
    } catch (err) {
        return res.status(401).json({message: 'Invalid token'});
    }
}       

// REQUEST 
// MIDDLEWARE
// FUNÇÃO => RESPONSE