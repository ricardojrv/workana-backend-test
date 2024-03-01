import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";
import './db/redis'
import { routes } from './routes';
import errorHandling from './middlewares/errorHandling';
import { AppDataSource } from './db/dataSource'
import logger from './library/logger/logger';
import verifyToken from './middlewares/verifyToken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(errorHandling);
app.use(verifyToken)
app.use('/', routes);




app.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`);

  AppDataSource.initialize().then(() => {
    logger.info(`Database Conected at port: ${process.env.DB_PORT}`);
  }).catch((error) => {
    logger.error(`Error: ${error}`);
  })
});
