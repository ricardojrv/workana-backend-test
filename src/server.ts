import dotenv from 'dotenv';
import redisClient from './library/redis/redis';
import prisma from './db/prisma';
import logger from './library/logger/logger';
import app from './app';
dotenv.config();



prisma.$connect().then(() => {

  const PORT = process.env.PORT || 3000;


  logger.info(`Database Conected at port: ${process.env.DB_PORT}`);
  redisClient.connect();
  return app.listen(PORT, async () => {
    console.info(`Server updated again listening on port ${PORT}`);
  });

}).catch((error) => {
  logger.error(`Error: ${error}`);
});



