import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Users from '../models/Users';

export default {
    async test(req: Request, res: Response) {
        const UsersRepository = getRepository(Users);
        const user = await  UsersRepository.findOne(req.userId);

        return res.json({user_email: user?.email});
    }
}