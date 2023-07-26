/** @format */

import userRouter from './userRouter.js';
import typeRouter from './typeRouter.js';
import brandRouter from './brandRouter.js';
import deviceRouter from './deviceRouter.js';

const initRoutes = (app) => {
  app.use('/user', userRouter);
  app.use('/type', typeRouter);
  app.use('/brand', brandRouter);
  app.use('/device', deviceRouter);
};

export { initRoutes };
