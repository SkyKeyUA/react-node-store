/** @format */

const initRoutes = (app) => {
  app.use('/user');
  app.use('/type');
  app.use('/brand');
  app.use('/device');
};

export { initRoutes };
