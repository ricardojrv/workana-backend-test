import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ], datasourceUrl: process.env.DATABASE_URL,
});



prisma.$on('warn', (e) => {
  console.warn(e.message, e.target);
});

prisma.$on('info', (e) => {
  console.info(e.message, e.target);
});

prisma.$on('error', (e) => {
  console.error(e.message, e.target);
});

export default prisma;
