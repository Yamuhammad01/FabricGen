import { PrismaClient } from '@prisma/client';
import config from '../config/index.js';
import logger from '../utils/logger.js';

let prismaClient: PrismaClient | null = null;

export function getPrismaClient(): PrismaClient {
  if (!prismaClient) {
    prismaClient = new PrismaClient({
      log: config.isDevelopment
        ? ['query', 'info', 'warn', 'error']
        : ['warn', 'error'],
    });
  }

  return prismaClient;
}

export async function connectDatabase(): Promise<void> {
  try {
    const client = getPrismaClient();
    await client.$connect();
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error({ err: error }, 'Failed to connect to database');
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  try {
    if (prismaClient) {
      await prismaClient.$disconnect();
      logger.info('Database disconnected successfully');
    }
  } catch (error) {
    logger.error({ err: error }, 'Failed to disconnect database');
  }
}