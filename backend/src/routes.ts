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

routes.use(authMiddleware);

routes.get('/authenticated',TestController.test);


export default routes;