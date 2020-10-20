import { query, Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm'
import Users from '../models/Users';
import Orphanage from '../models/Orphanage';
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
    },

    async approveOrphanage(req: Request, res: Response) {
        const { id } = req.params;
        const OrphanageRepository = getRepository(Orphanage);

        await getConnection()
                .createQueryBuilder()
                .update(Orphanage)
                .set({ is_approved: true })
                .where("id = :id", { id })
            .execute();            

        res.status(200).send();
    }
}