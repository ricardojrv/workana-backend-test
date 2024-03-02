import { RedisClientType, createClient } from 'redis';
import logger from '../library/logger/logger';

const client = createClient();

client.on('error', err => logger.error('Redis Client Error', err));

export default client
