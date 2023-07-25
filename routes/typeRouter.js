/** @format */

import express from 'express';
import { typeController } from '../controllers/typeController.js';

const typeRouter = express.Router();

typeRouter.post('/', typeController.create);
typeRouter.get('/', typeController.getAll);

export default typeRouter;
