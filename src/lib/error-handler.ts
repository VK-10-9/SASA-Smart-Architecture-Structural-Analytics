import { AppError, APIError, ValidationError } from '@/types/common';

/**
 * Centralized error handling utility for the SASA application
 */
export class ErrorHandler {
  /**
   * Handle API errors consistently
   */
  static handleAPIError(error: unknown): APIError {
    if (error instanceof APIError) {
      return error;
    }

    if (error instanceof ValidationError) {
      return new APIError(error.message, 400, 'VALIDATION_ERROR', error.context);
    }

    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('fetch')) {
        return new APIError('Network error occurred', 503, 'NETWORK_ERROR');
      }

      if (error.message.includes('timeout')) {
        return new APIError('Request timeout', 408, 'TIMEOUT_ERROR');
      }

      return new APIError(error.message, 500, 'UNKNOWN_ERROR');
    }

    return new APIError('An unexpected error occurred', 500, 'UNKNOWN_ERROR');
  }

  /**
   * Format error for user display
   */
  static formatUserError(error: unknown): string {
    const apiError = this.handleAPIError(error);

    // Map technical errors to user-friendly messages
    switch (apiError.code) {
      case 'VALIDATION_ERROR':
        return apiError.message;
      case 'NETWORK_ERROR':
        return 'Unable to connect to the server. Please check your internet connection.';
      case 'TIMEOUT_ERROR':
        return 'The request is taking too long. Please try again.';
      case 'API_KEY_ERROR':
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return apiError.statusCode >= 500 
          ? 'Something went wrong on our end. Please try again later.'
          : apiError.message;
    }
  }

  /**
   * Log error with context
   */
  static logError(error: unknown, context?: Record<string, any>): void {
    const apiError = this.handleAPIError(error);
    
    console.error('SASA Error:', {
      message: apiError.message,
      code: apiError.code,
      statusCode: apiError.statusCode,
      context: { ...apiError.context, ...context },
      stack: apiError.stack,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Create a standardized error response for API routes
   */
  static createErrorResponse(error: unknown, defaultMessage = 'An error occurred') {
    const apiError = this.handleAPIError(error);
    this.logError(apiError);

    return {
      success: false,
      error: apiError.statusCode >= 500 ? defaultMessage : apiError.message,
      code: apiError.code
    };
  }

  /**
   * Retry logic for failed operations
   */
  static async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    delay = 1000
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        // Don't retry validation errors
        if (error instanceof ValidationError) {
          throw error;
        }

        // Don't retry on last attempt
        if (attempt === maxRetries) {
          break;
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }

    throw lastError;
  }

  /**
   * Timeout wrapper for promises
   */
  static withTimeout<T>(promise: Promise<T>, timeoutMs = 30000): Promise<T> {
    return Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new APIError('Request timeout', 408, 'TIMEOUT_ERROR'));
        }, timeoutMs);
      })
    ]);
  }
}

/**
 * React hook for error handling
 */
export const useErrorHandler = () => {
  const handleError = (error: unknown, context?: Record<string, any>) => {
    ErrorHandler.logError(error, context);
    return ErrorHandler.formatUserError(error);
  };

  return { handleError };
};
