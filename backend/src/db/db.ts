import { PrismaClient } from '@prisma/client';

console.log('DB URL:', process.env.DATABASE_URL);
export const prisma = new PrismaClient();