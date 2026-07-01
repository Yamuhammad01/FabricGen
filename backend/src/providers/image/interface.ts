export interface ImageGenerationOptions {
  prompt: string;
  width?: number;
  height?: number;
  numImages?: number;
  seed?: number;
  [key: string]: unknown;
}

export interface ImageGenerationResult {
  images: GeneratedImageData[];
  prompt: string;
  seed?: number;
  rawResponse?: unknown;
}

export interface GeneratedImageData {
  id: string;
  url: string;
  width: number;
  height: number;
  format: string;
}

export interface ImageGenerationProvider {
  readonly name: string;

  generateImage(options: ImageGenerationOptions): Promise<ImageGenerationResult>;

  isAvailable(): boolean;
}