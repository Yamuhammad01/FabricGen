import { type Response } from 'express';
import { type ApiResponse, type PaginatedApiResponse } from '../interfaces/index.js';
import { HTTP_STATUS } from '../constants/index.js';

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode: number = HTTP_STATUS.OK
): void {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
}

export function sendCreated<T>(
  res: Response,
  data: T,
  message = 'Created successfully'
): void {
  sendSuccess(res, data, message, HTTP_STATUS.CREATED);
}

export function sendNoContent(res: Response): void {
  res.status(HTTP_STATUS.NO_CONTENT).send();
}

export function sendPaginated<T>(
  res: Response,
  data: T[],
  pagination: { page: number; limit: number; total: number; totalPages: number },
  message = 'Success'
): void {
  const response: PaginatedApiResponse<T> = {
    success: true,
    message,
    data,
    pagination,
    timestamp: new Date().toISOString(),
  };

  res.status(HTTP_STATUS.OK).json(response);
}

export function sendError(
  res: Response,
  message: string,
  error: string,
  statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
): void {
  const response: ApiResponse = {
    success: false,
    message,
    error,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
}