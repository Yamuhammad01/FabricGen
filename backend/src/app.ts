import express, { type Express, type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import config from './config/index.js';
import { HTTP_STATUS } from './constants/index.js';
import { sendError } from './utils/response.js';

const app: Express = express();

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: config.isDevelopment ? '*' : true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  })
);

// Compression
app.use(compression());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging (development only)
if (config.isDevelopment) {
  app.use(requestLogger);
}

// Routes
app.use(routes);

// 404 handler
app.use((_req: Request, res: Response) => {
  sendError(res, 'Route not found', 'NotFoundError', HTTP_STATUS.NOT_FOUND);
});

// Global error handler
app.use(errorHandler);

export default app;