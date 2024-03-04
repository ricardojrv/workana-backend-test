import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const BD_URL = `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({ connectionString: BD_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter, log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ], datasourceUrl: BD_URL,
});



prisma.$on('warn', (e) => {
  console.log(e);
});

prisma.$on('info', (e) => {
  console.log(e);
});

prisma.$on('error', (e) => {
  console.log(e);
});

export default prisma;
