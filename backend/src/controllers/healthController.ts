import { type Request, type Response } from 'express';
import config from '../config/index.js';
import { sendSuccess } from '../utils/response.js';
import { type HealthResponse } from '../types/index.js';

export function getHealth(_req: Request, res: Response): void {
  const data: HealthResponse = {
    status: 'ok',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  };

  sendSuccess(res, data, 'Service is healthy');
}