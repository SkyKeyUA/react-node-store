/** @format */

import userRouter from './userRouter.js';
import typeRouter from './userRouter.js';
import brandRouter from './userRouter.js';
import deviceRouter from './userRouter.js';

const initRoutes = (app) => {
  app.use('/user', userRouter);
  app.use('/type', typeRouter);
  app.use('/brand', brandRouter);
  app.use('/device', deviceRouter);
};

export { initRoutes };
