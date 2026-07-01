import { type Request, type Response, type NextFunction } from 'express';
import { type AsyncRequestHandler } from '../interfaces/index.js';

export function asyncHandler(fn: AsyncRequestHandler) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}