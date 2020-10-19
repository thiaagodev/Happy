import { Request, Response } from 'express';
import { getRepository } from 'typeorm'
import Users from '../models/Users';
import * as Yup from 'yup';

export default {
    async create(req: Request, res:Response) {
        const {
            name,
            email,
            password
        } = req.body;

        const UsersRepository = getRepository(Users);

        const data = {
            name,
            email,
            password
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const user = UsersRepository.create(data);

        await UsersRepository.save(user);

        return res.status(201).json(user);
    }
}