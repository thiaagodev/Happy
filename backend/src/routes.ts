import { Router, Response } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import SessionController from './controllers/SessionController';
import UsersController from './controllers/UsersController';
import TestController from './controllers/TestController';

import authMiddleware from './middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);
// MVC

// Model 
// Views
// Controllers

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'),OrphanagesController.create);


routes.post('/register/user', UsersController.create);
routes.post('/session', SessionController.store);

// A partir daqui somente rotas autenticadas
routes.use(authMiddleware);

routes.put('/approve/orphanage/:id',UsersController.approveOrphanage);
routes.get('/pending-orphanages/', UsersController.showPendingOrphanages);
routes.get('/pending-orphanages-details/:id', UsersController.showOrphanageDetails);
routes.put('/edit/orphanage/:id', upload.array('images'), UsersController.editOrphanage);
routes.delete('/remove/orphanage/:id', UsersController.removeOrphanage);


export default routes;