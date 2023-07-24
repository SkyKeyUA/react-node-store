/** @format */

import express from 'express';

const deviceRouter = express.Router();

deviceRouter.post('/');
deviceRouter.get('/');
deviceRouter.get('/:id');

export default deviceRouter;
