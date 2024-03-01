import { RedisClientType, createClient } from "redis";
import logger from "../library/logger/logger";
import { promisify } from "util";

let redisClient: RedisClientType;
const Redis: {
  getAsync?: (key: string) => Promise<string | null>,
  setAsync?: (key: string, value: string) => Promise<void>,
  setExAsync?: (key: string, seconds: number, value: string) => Promise<void>,
  hSetAsync?: (key: string, field: string, value: string) => Promise<number>,
  hGetAsync?: (key: string, field: string) => Promise<string | null>,
} = {};

(async () => {
  redisClient = createClient();

  redisClient.on('error', err => logger.error(`Redis Error: ${err}`));
  redisClient.on('connect', () => logger.info('Redis connected'));
  redisClient.on('reconnecting', () => logger.info('Redis reconnecting'));
  redisClient.on('ready', () => {
    logger.info('Redis ready!');

    Redis.getAsync = promisify(redisClient.get).bind(redisClient);
    Redis.setAsync = promisify(redisClient.set).bind(redisClient);
    Redis.setExAsync = promisify(redisClient.setEx).bind(redisClient);
    Redis.hSetAsync = promisify(redisClient.hSet).bind(redisClient);
    Redis.hGetAsync = promisify(redisClient.hGet).bind(redisClient);
  });

  await redisClient.connect();
})();

export default Redis;
