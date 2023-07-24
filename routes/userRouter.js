/** @format */

import express from 'express';

const userRouter = express.Router();

userRouter.post('/registration');
userRouter.post('/login');
userRouter.get('/auth', (req, res) => {
  res.json({ message: 'All working!' });
});

export default userRouter;
