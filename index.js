/** @format */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import DataBase from './db.js';
import models from './models/models.js';
import { initRoutes } from './routes/index.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const PORT = process.env.PORT || 7000;
const app = express();
app.use(cors());
app.use(express.json());

initRoutes(app);
app.use(errorMiddleware);

const start = async () => {
  try {
    await DataBase.authenticate();
    await DataBase.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
