import app from './app.js';
import config from './config/index.js';
import logger from './utils/logger.js';
import { connectDatabase, disconnectDatabase } from './database/index.js';

async function startServer(): Promise<void> {
  try {
    // Connect to database
    await connectDatabase();

    // Start Express server
    const server = app.listen(config.port, () => {
      logger.info(
        {
          port: config.port,
          environment: config.nodeEnv,
          visionProvider: config.activeVisionProvider,
          imageProvider: config.activeImageProvider,
        },
        `FabricGen server started on port ${config.port}`
      );
    });

    // Graceful shutdown handlers
    const gracefulShutdown = async (signal: string) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        logger.info('HTTP server closed');
        await disconnectDatabase();
        logger.info('Graceful shutdown complete');
        process.exit(0);
      });

      // Force shutdown after 30 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 30000);
    };

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

    // Handle unhandled rejections
    process.on('unhandledRejection', (reason: unknown) => {
      logger.error({ err: reason }, 'Unhandled Promise rejection');
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      logger.error({ err: error }, 'Uncaught exception');
      process.exit(1);
    });
  } catch (error) {
    logger.error({ err: error }, 'Failed to start server');
    process.exit(1);
  }
}

startServer();