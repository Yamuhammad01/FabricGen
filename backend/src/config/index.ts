import dotenv from 'dotenv';
import path from 'path';
import { type Environment, type LogLevel } from '../types/index.js';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Config {
  port: number;
  nodeEnv: Environment;
  databaseUrl: string;
  geminiApiKey: string;
  falApiKey: string;
  activeVisionProvider: string;
  activeImageProvider: string;
  logLevel: LogLevel;
  uploadPath: string;
  maxUploadSize: number;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
}

function getEnvVariable(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const config: Config = {
  port: parseInt(getEnvVariable('PORT', '3000'), 10),
  nodeEnv: getEnvVariable('NODE_ENV', 'development') as Environment,
  databaseUrl: getEnvVariable('DATABASE_URL'),
  geminiApiKey: getEnvVariable('GEMINI_API_KEY', ''),
  falApiKey: getEnvVariable('FAL_API_KEY', ''),
  activeVisionProvider: getEnvVariable('ACTIVE_VISION_PROVIDER', 'gemini'),
  activeImageProvider: getEnvVariable('ACTIVE_IMAGE_PROVIDER', 'flux'),
  logLevel: getEnvVariable('LOG_LEVEL', 'info') as LogLevel,
  uploadPath: getEnvVariable('UPLOAD_PATH', './uploads'),
  maxUploadSize: parseInt(getEnvVariable('MAX_UPLOAD_SIZE', '5242880'), 10),
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
};

export default config;