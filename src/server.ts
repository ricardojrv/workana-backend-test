import dotenv from 'dotenv';
dotenv.config();
import './library/redis/redis';
import prisma from './db/prisma';
import logger from './library/logger/logger';
import app from './app';

prisma.$connect().then(() => {
  const PORT = process.env.PORT || 3000;

  logger.info(`Database Conected at port: ${process.env.DB_PORT}`);

  return app.listen(PORT, async () => {
    console.info(`Server updated again listening on port ${PORT}`);
  });

}).catch((error) => {
  logger.error(`Error: ${error}`);
});



