export const API_PREFIX = '/api/v1';

export const HEALTH_PATH = '/health';

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/tiff',
] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'] as const;

export const VISION_PROVIDERS = ['gemini', 'openai', 'claude'] as const;

export const IMAGE_PROVIDERS = ['flux', 'openai'] as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
} as const;