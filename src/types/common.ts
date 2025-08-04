// Common type definitions for the SASA application

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface TokenUsage {
  prompt: number;
  completion: number;
  total: number;
}

export interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Physics-related types
export interface PhysicsInput {
  area?: number;
  thickness?: number;
  density?: number;
  velocity?: number;
  mass?: number;
  force?: number;
  angle?: number;
  coefficientFriction?: number;
  loadPerArea?: number;
  spectralAcceleration?: number;
  importanceFactor?: number;
  responseModificationFactor?: number;
  dragCoefficient?: number;
  airDensity?: number;
}

export interface CalculationStep {
  description: string;
  formula: string;
  calculation: string;
  result: string;
}

export interface CalculationResult {
  steps: CalculationStep[];
  finalAnswer: string;
  totalLoad?: number;
  unit?: string;
}

// Design scenario types
export interface DesignScenarioInput {
  scenario: string;
  material: string;
}

export interface DesignScenarioResult {
  analysis: string;
  tokenUsage?: TokenUsage;
  searchResults?: SearchResult[];
}

// Form validation types
export interface FormField {
  name: string;
  value: string | number;
  rules: ValidationRule[];
  error?: string;
}

export interface ValidationRule {
  type: 'required' | 'email' | 'min' | 'max' | 'pattern';
  value?: any;
  message: string;
}

// API request/response types
export interface PhysicsProblemRequest {
  type: string;
  parameters: {
    problem: string;
  };
}

export interface PhysicsAPIResponse extends APIResponse {
  explanation?: string;
  tokenUsage?: TokenUsage;
  searchResults?: SearchResult[];
}

export interface DesignScenarioAPIResponse extends APIResponse {
  analysis?: string;
  tokenUsage?: TokenUsage;
  searchResults?: SearchResult[];
}

// Error types
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, any>;
}

export class ValidationError extends Error implements AppError {
  code = 'VALIDATION_ERROR';
  statusCode = 400;
  context?: Record<string, any>;

  constructor(message: string, context?: Record<string, any>) {
    super(message);
    this.name = 'ValidationError';
    this.context = context;
  }
}

export class APIError extends Error implements AppError {
  code?: string;
  statusCode: number;
  context?: Record<string, any>;

  constructor(message: string, statusCode: number = 500, code?: string, context?: Record<string, any>) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.code = code;
    this.context = context;
  }
}
