import morgan from 'morgan';
import logger from '../utils/logger.js';
import config from '../config/index.js';

const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

const skip = () => {
  return config.isProduction || config.isTest;
};

export const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);