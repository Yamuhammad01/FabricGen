export interface VisionAnalysisResult {
  fabricType: string;
  dominantColors: string[];
  pattern: string;
  description?: string;
  attributes?: Record<string, unknown>;
  rawResponse?: unknown;
}

export interface VisionProvider {
  readonly name: string;

  analyzeImage(imageBuffer: Buffer, mimeType: string): Promise<VisionAnalysisResult>;

  isAvailable(): boolean;
}