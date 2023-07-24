/** @format */

import express from 'express';
import { userController } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/auth', userController.check);

export default userRouter;
