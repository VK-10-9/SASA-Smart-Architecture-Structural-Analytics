/**
 * Configuration management for the SASA application
 * Centralizes environment variables and provides type safety
 */

export interface AppConfig {
  // API Configuration
  togetherApiKey: string;
  resendApiKey: string;
  baseUrl: string;
  
  // Environment
  nodeEnv: 'development' | 'production' | 'test';
  
  // API Settings
  togetherAiModel: string;
  apiTimeoutMs: number;
  maxRequestSize: number;
  
  // Security
  allowedOrigins: string[];
  
  // Rate Limiting
  rateLimitMax: number;
  
  // Logging
  logLevel: 'error' | 'warn' | 'info' | 'debug';
  
  // Contact
  contactEmail: string;
  
  // Feature Flags
  enableWebSearch: boolean;
  enableAiAnalysis: boolean;
  enableContactForm: boolean;
  
  // Cache
  cacheTtlSeconds: number;
}

class ConfigService {
  private static instance: ConfigService;
  private config: AppConfig;

  private constructor() {
    this.config = this.loadConfig();
    this.validateConfig();
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  private loadConfig(): AppConfig {
    return {
      // API Configuration
      togetherApiKey: process.env.TOGETHER_API_KEY || '',
      resendApiKey: process.env.RESEND_API_KEY || '',
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      
      // Environment
      nodeEnv: (process.env.NODE_ENV as AppConfig['nodeEnv']) || 'development',
      
      // API Settings
      togetherAiModel: process.env.TOGETHER_AI_MODEL || 'lgai/exaone-3-5-32b-instruct',
      apiTimeoutMs: parseInt(process.env.API_TIMEOUT_MS || '30000'),
      maxRequestSize: parseInt(process.env.MAX_REQUEST_SIZE || '1048576'),
      
      // Security
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
      
      // Rate Limiting
      rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '60'),
      
      // Logging
      logLevel: (process.env.LOG_LEVEL as AppConfig['logLevel']) || 'info',
      
      // Contact
      contactEmail: process.env.CONTACT_EMAIL || 'info@sasa.engineer',
      
      // Feature Flags
      enableWebSearch: process.env.ENABLE_WEB_SEARCH !== 'false',
      enableAiAnalysis: process.env.ENABLE_AI_ANALYSIS !== 'false',
      enableContactForm: process.env.ENABLE_CONTACT_FORM !== 'false',
      
      // Cache
      cacheTtlSeconds: parseInt(process.env.CACHE_TTL_SECONDS || '3600'),
    };
  }

  private validateConfig(): void {
    const errors: string[] = [];

    // Validate required API keys in production
    if (this.config.nodeEnv === 'production') {
      if (!this.config.togetherApiKey) {
        errors.push('TOGETHER_API_KEY is required in production');
      }
      if (!this.config.resendApiKey) {
        errors.push('RESEND_API_KEY is required in production');
      }
    }

    // Validate numeric values
    if (this.config.apiTimeoutMs <= 0) {
      errors.push('API_TIMEOUT_MS must be positive');
    }
    if (this.config.maxRequestSize <= 0) {
      errors.push('MAX_REQUEST_SIZE must be positive');
    }
    if (this.config.rateLimitMax <= 0) {
      errors.push('RATE_LIMIT_MAX must be positive');
    }

    // Validate URLs
    try {
      new URL(this.config.baseUrl);
    } catch {
      errors.push('NEXT_PUBLIC_BASE_URL must be a valid URL');
    }

    if (errors.length > 0) {
      throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
    }
  }

  public get(): AppConfig {
    return { ...this.config };
  }

  public getApiKey(service: 'together' | 'resend'): string {
    switch (service) {
      case 'together':
        return this.config.togetherApiKey;
      case 'resend':
        return this.config.resendApiKey;
      default:
        throw new Error(`Unknown service: ${service}`);
    }
  }

  public isFeatureEnabled(feature: keyof Pick<AppConfig, 'enableWebSearch' | 'enableAiAnalysis' | 'enableContactForm'>): boolean {
    return this.config[feature];
  }

  public isDevelopment(): boolean {
    return this.config.nodeEnv === 'development';
  }

  public isProduction(): boolean {
    return this.config.nodeEnv === 'production';
  }
}

// Export singleton instance
export const config = ConfigService.getInstance().get();
export const configService = ConfigService.getInstance();

// Export individual config values for convenience
export const {
  togetherApiKey,
  resendApiKey,
  baseUrl,
  nodeEnv,
  togetherAiModel,
  apiTimeoutMs,
  maxRequestSize,
  allowedOrigins,
  rateLimitMax,
  logLevel,
  contactEmail,
  enableWebSearch,
  enableAiAnalysis,
  enableContactForm,
  cacheTtlSeconds
} = config;
