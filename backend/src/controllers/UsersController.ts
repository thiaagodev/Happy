import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm'
import Users from '../models/Users';
import * as Yup from 'yup';

import pendingOrphanagesView from '../views/pending_orphanages_view';
import Orphanage from '../models/Orphanage';
import Image from '../models/Image';

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

        await getConnection()
                .createQueryBuilder()
                .update(Orphanage)
                .set({ is_approved: true })
                .where("id = :id", { id })
            .execute();            

        res.status(200).send();
    },

    async showPendingOrphanages(req: Request, res:Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        const notApprovedOrphanages: any = []; 

        orphanages.map(orphanage => {
            if(orphanage.is_approved === false) {
                notApprovedOrphanages.push(orphanage)
            };
        })

        return res.json(pendingOrphanagesView.renderMany(notApprovedOrphanages));
    },

    async showOrphanageDetails(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(pendingOrphanagesView.render(orphanage));
    },

    async editOrphanage(req: Request, res: Response) {
        const { id } = req.params; 
         
        const {
            name,
            latitude,
            longitude,
            about,
            whatsapp_number,
            instructions,
            opening_hours,
            open_on_weekends,
            is_approved
        } = req.body;

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map( image => {
            return { path: image.filename }
        })


        const data = {
            name,
            latitude,
            longitude,
            about,
            whatsapp_number,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            is_approved: is_approved === 'true',
            images
        }


        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            whatsapp_number: Yup.string().required(),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required(),
            })) 
        });

        await schema.validate(data, {
            abortEarly: false,
        });

       await getConnection()
                .createQueryBuilder()
                .update(Orphanage)
                .set({ 
                    name: data.name,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    about: data.about,
                    whatsapp_number: data.whatsapp_number,
                    instructions: data.instructions,
                    opening_hours: data.opening_hours,
                    open_on_weekends: data.open_on_weekends,
                 })
                .where("id = :id", { id })
            .execute();

        const imagesOld = await getRepository(Image).find({ where: { orphanage: id} })
        
        //Percorrendo todas as imagens no banco com o id do orfanato e trocando pelas novas imagens enviadas 
        for(let index = 0; index < images.length && index < imagesOld.length; index++) {
            async function updateImages(){
                let idImage = imagesOld[index].id; 
                await getConnection()
                    .createQueryBuilder()
                    .update(Image)
                    .set({ 
                        path: images[index].path
                     })
                    .where("id = :idImage", { idImage })
                .execute();
                //Excluindo as imagens que estão no banco mas não estão na request de edição
                // Deixando apenas as imagens que foram enviadas para edição no banco de dados 
                let path = images[index].path;
                await getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(Image)
                    .where("path != :path", { path })
                .execute();
            } 
            updateImages();
        }

        res.status(204).json({message: 'Orphanage has been updated'});
    },
    
    async removeOrphanage(req: Request, res: Response) {
        const { id } = req.params;

        const OrphanageRepository = getRepository(Orphanage);
        await OrphanageRepository.delete(id);

        res.status(204).json({message: 'Orphanage has been deleted'});
    }
    
}