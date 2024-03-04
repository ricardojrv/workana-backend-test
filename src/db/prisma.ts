import { PrismaClient } from '@prisma/client';
import logger from '../library/logger/logger';

const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ], datasourceUrl: process.env.DATABASE_URL,
});



prisma.$on('warn', (e) => {
  logger.warn(e.message, e.target);
});

prisma.$on('info', (e) => {
  logger.info(e.message, e.target);
});

prisma.$on('error', (e) => {
  logger.error(e.message, e.target);
});

export default prisma;
