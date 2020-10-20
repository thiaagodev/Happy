import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Users from '../models/Users';

dotenv.config();
export default {
    async store (req: Request, res: Response) {
        const { email, password } = req.body;
        const UserRepository = getRepository(Users);

        const user = await UserRepository.findOne({ email });

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }   

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(401).json({message: 'Wrong password'});
        }

        return res.json({
            token: jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
                expiresIn: '1d'
            })
        });
        
    }
}