import { type VisionProvider, type VisionAnalysisResult } from '../../providers/vision/index.js';
import { InternalServerError } from '../../errors/index.js';

export class VisionService {
  private provider: VisionProvider;

  constructor(provider: VisionProvider) {
    this.provider = provider;
  }

  async analyzeFabricImage(imageBuffer: Buffer, mimeType: string): Promise<VisionAnalysisResult> {
    if (!this.provider.isAvailable()) {
      throw new InternalServerError('Vision provider is not available');
    }

    return this.provider.analyzeImage(imageBuffer, mimeType);
  }

  getProviderName(): string {
    return this.provider.name;
  }
}