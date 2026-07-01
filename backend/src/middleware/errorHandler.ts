import { type Request, type Response, type NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError, ValidationError } from '../errors/index.js';
import { HTTP_STATUS } from '../constants/index.js';
import { sendError } from '../utils/response.js';
import logger from '../utils/logger.js';
import config from '../config/index.js';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    const validationErrors: Record<string, string[]> = {};

    for (const issue of err.issues) {
      const path = issue.path.join('.');
      if (!validationErrors[path]) {
        validationErrors[path] = [];
      }
      validationErrors[path]!.push(issue.message);
    }

    const validationError = new ValidationError('Validation failed', validationErrors);
    sendError(
      res,
      validationError.message,
      JSON.stringify(validationError.errors),
      validationError.statusCode
    );
    return;
  }

  if (err instanceof AppError) {
    if (!err.isOperational) {
      logger.error({ err }, 'Non-operational error occurred');
    }

    sendError(res, err.message, err.name, err.statusCode);
    return;
  }

  logger.error({ err }, 'Unhandled error');

  const statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = config.isProduction ? 'Internal server error' : err.message;

  sendError(res, message, 'InternalServerError', statusCode);
}