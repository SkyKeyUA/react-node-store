/** @format */

import express from 'express';
import { typeController } from '../controllers/typeController.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';

const typeRouter = express.Router();

typeRouter.post('/', checkRoleMiddleware('ADMIN'), typeController.create);
typeRouter.get('/', typeController.getAll);

export default typeRouter;
