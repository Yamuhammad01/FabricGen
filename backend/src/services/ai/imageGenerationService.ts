import { type ImageGenerationProvider, type ImageGenerationOptions, type ImageGenerationResult } from '../../providers/image/index.js';
import { InternalServerError } from '../../errors/index.js';

export class ImageGenerationService {
  private provider: ImageGenerationProvider;

  constructor(provider: ImageGenerationProvider) {
    this.provider = provider;
  }

  async generateImage(options: ImageGenerationOptions): Promise<ImageGenerationResult> {
    if (!this.provider.isAvailable()) {
      throw new InternalServerError('Image generation provider is not available');
    }

    return this.provider.generateImage(options);
  }

  getProviderName(): string {
    return this.provider.name;
  }
}