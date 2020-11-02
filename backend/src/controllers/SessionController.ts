import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import * as dotenv from 'dotenv';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import mailer from '../mailer/mailer';

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
            user: {
                name: user.name,
                email: user.email
            },
            token: jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
                expiresIn: '1d'
            })
        });
        
    },

    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;

        const UserRepository = getRepository(Users);

        const user = await UserRepository.findOne({ email });

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }   
        
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        const id = user.id;
        await getConnection()
            .createQueryBuilder()
            .update(Users)
            .set({ 
                password_reset_token: token,
                password_reset_expires: now
            })
            .where("id = :id", { id })
        .execute();

        mailer.sendMail({
            to: email,
            from: 'thiferr09@gmail.com',
            html: `<p>Você esqueceu sua senha? Não tem problema, acesse esse link para redefinir sua senha: http://localhost:3000/forgot-password?token=${token}</p>`,
        }, (err) => {
            if(err) {
                return res.status(400).json({message: 'Error on forgot password, try again'})
            }
        })

        return res.status(200).json({message: 'E-mail successfully sent'})
    },

    async resetPassword(req: Request, res: Response) {
        const { email, token, password } = req.body;

        const UserRepository = getRepository(Users);

        const user = await UserRepository.findOne({ email });

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }   

        if(token !== user.password_reset_token) {
            return res.status(400).json({message: 'Token invalid'});
        }

        const now = new Date();

        if(now > user.password_reset_expires) {
            return res.status(400).json({message: 'Token expired, generate a new one'});
        }

        const id = user.id;
        const passwordhash = await bcrypt.hash(password, 8);

        await getConnection()
            .createQueryBuilder()
            .update(Users)
            .set({ 
                password: passwordhash,
            })
            .where("id = :id", { id })
        .execute();

        res.status(200).json({message: 'User has been updated'});
    }
}