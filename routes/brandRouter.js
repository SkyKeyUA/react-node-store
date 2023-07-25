/** @format */

import express from 'express';
import { brandController } from '../controllers/brandController.js';

const brandRouter = express.Router();

brandRouter.post('/', brandController.create);
brandRouter.get('/', brandController.getAll);

export default brandRouter;
