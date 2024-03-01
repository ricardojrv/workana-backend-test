import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes';
import errorHandling from './middlewares/errorHandling';
import { AppDataSource } from './db/dataSource'
import { createClient } from 'redis';
import logger from './library/logger/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const redisClient = createClient();

redisClient.on('error', (err) => {
  logger.error('Redis connection error:', err);
});

redisClient.connect().then(() => {
  logger.info('Connected to Redis successfully');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandling);
app.use('/', routes);




app.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`);

  AppDataSource.initialize().then(() => {
    logger.info(`Database Conected at port: ${process.env.DB_PORT}`);
  }).catch((error) => {
    logger.error(`Error: ${error}`);
  })
});
