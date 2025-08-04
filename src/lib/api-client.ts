import { ErrorHandler } from './error-handler';
import { ValidationUtils } from './validation';
import { APIError } from '@/types/common';
import type { 
  PhysicsProblemRequest, 
  PhysicsAPIResponse, 
  DesignScenarioInput, 
  DesignScenarioAPIResponse,
  APIResponse 
} from '@/types/common';

/**
 * Enhanced API client with proper error handling, validation, and retries
 */
export class APIClient {
  private static baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';

  /**
   * Generic fetch wrapper with error handling
   */
  private static async fetchWithErrorHandling<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new APIError(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData.code
        );
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new APIError('Request timeout', 408, 'TIMEOUT_ERROR');
      }
      
      throw error;
    }
  }

  /**
   * Solve physics problem with validation and error handling
   */
  static async solvePhysicsProblem(request: PhysicsProblemRequest): Promise<PhysicsAPIResponse> {
    // Validate input
    const validation = ValidationUtils.validatePhysicsInput(request.parameters);
    if (!validation.isValid) {
      throw new APIError(
        `Validation failed: ${validation.errors.join(', ')}`,
        400,
        'VALIDATION_ERROR'
      );
    }

    // Sanitize input
    const sanitizedRequest = {
      ...request,
      parameters: {
        ...request.parameters,
        problem: ValidationUtils.sanitizeInput(request.parameters.problem)
      }
    };

    return ErrorHandler.withRetry(async () => {
      return this.fetchWithErrorHandling<PhysicsAPIResponse>('/api/solve-physics', {
        method: 'POST',
        body: JSON.stringify(sanitizedRequest),
      });
    });
  }

  /**
   * Analyze design scenario with validation
   */
  static async analyzeDesignScenario(input: DesignScenarioInput): Promise<DesignScenarioAPIResponse> {
    // Validate input
    const validation = ValidationUtils.validateDesignScenario(input);
    if (!validation.isValid) {
      throw new APIError(
        `Validation failed: ${validation.errors.join(', ')}`,
        400,
        'VALIDATION_ERROR'
      );
    }

    // Sanitize input
    const sanitizedInput = {
      scenario: ValidationUtils.sanitizeInput(input.scenario),
      material: ValidationUtils.sanitizeInput(input.material)
    };

    return ErrorHandler.withRetry(async () => {
      return this.fetchWithErrorHandling<DesignScenarioAPIResponse>('/api/design-scenario', {
        method: 'POST',
        body: JSON.stringify(sanitizedInput),
      });
    });
  }

  /**
   * Send contact form with validation
   */
  static async sendContactForm(form: { name: string; email: string; message: string }): Promise<APIResponse> {
    // Validate form
    const validation = ValidationUtils.validateContactForm(form);
    if (!validation.isValid) {
      throw new APIError(
        `Validation failed: ${validation.errors.join(', ')}`,
        400,
        'VALIDATION_ERROR'
      );
    }

    // Sanitize form data
    const sanitizedForm = {
      name: ValidationUtils.sanitizeInput(form.name),
      email: ValidationUtils.sanitizeInput(form.email),
      message: ValidationUtils.sanitizeInput(form.message)
    };

    return ErrorHandler.withRetry(async () => {
      return this.fetchWithErrorHandling<APIResponse>('/api/contact', {
        method: 'POST',
        body: JSON.stringify(sanitizedForm),
      });
    }, 2); // Only retry twice for contact form
  }

  /**
   * Perform calculations with validation
   */
  static async performCalculation(data: Record<string, any>): Promise<APIResponse> {
    return ErrorHandler.withRetry(async () => {
      return this.fetchWithErrorHandling<APIResponse>('/api/calculate', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    });
  }

  /**
   * Search the web for relevant information
   */
  static async searchWeb(query: string, maxResults = 5): Promise<APIResponse> {
    if (!query.trim()) {
      throw new APIError('Search query is required', 400, 'VALIDATION_ERROR');
    }

    const sanitizedQuery = ValidationUtils.sanitizeInput(query);

    return this.fetchWithErrorHandling<APIResponse>('/api/web-search', {
      method: 'POST',
      body: JSON.stringify({ 
        query: sanitizedQuery, 
        maxResults: Math.min(maxResults, 10) // Limit to max 10 results
      }),
    });
  }
}

/**
 * React hook for API operations
 */
export const useAPI = () => {
  const solvePhysicsProblem = async (request: PhysicsProblemRequest) => {
    try {
      return await APIClient.solvePhysicsProblem(request);
    } catch (error) {
      const userError = ErrorHandler.formatUserError(error);
      throw new Error(userError);
    }
  };

  const analyzeDesignScenario = async (input: DesignScenarioInput) => {
    try {
      return await APIClient.analyzeDesignScenario(input);
    } catch (error) {
      const userError = ErrorHandler.formatUserError(error);
      throw new Error(userError);
    }
  };

  const sendContactForm = async (form: { name: string; email: string; message: string }) => {
    try {
      return await APIClient.sendContactForm(form);
    } catch (error) {
      const userError = ErrorHandler.formatUserError(error);
      throw new Error(userError);
    }
  };

  return {
    solvePhysicsProblem,
    analyzeDesignScenario,
    sendContactForm,
  };
};
