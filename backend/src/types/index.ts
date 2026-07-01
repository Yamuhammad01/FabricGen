export interface HealthResponse {
  status: 'ok' | 'error';
  environment: string;
  timestamp: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FabricAnalysis {
  fabricType: string;
  dominantColors: string[];
  pattern: string;
  description?: string;
  attributes?: Record<string, unknown>;
}

export interface GenerationPrompt {
  fabricType: string;
  dominantColors: string[];
  pattern: string;
  garmentType?: string;
  style?: string;
  additionalInstructions?: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  width: number;
  height: number;
  format: string;
  createdAt: string;
}

export type VisionProviderType = 'gemini' | 'openai' | 'claude';
export type ImageProviderType = 'flux' | 'openai';

export type Environment = 'development' | 'production' | 'test';
export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';