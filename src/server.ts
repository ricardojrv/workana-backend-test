import dotenv from 'dotenv';
import redisClient from './db/redis'
import { AppDataSource } from './db/dataSource'
import logger from './library/logger/logger';
import app from './app'



AppDataSource.initialize().then(() => {
  dotenv.config();

  const PORT = process.env.PORT || 3000;


  logger.info(`Database Conected at port: ${process.env.DB_PORT}`);
  redisClient.connect()
  return app.listen(PORT, async () => {
    console.info(`Server updated again listening on port ${PORT}`);
  })

}).catch((error) => {
  logger.error(`Error: ${error}`);
})



