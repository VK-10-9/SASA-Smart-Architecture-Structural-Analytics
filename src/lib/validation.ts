import { ValidationRule, ValidationResult, FormField } from '@/types/common';

/**
 * Comprehensive validation utility for the SASA application
 */
export class ValidationUtils {
  /**
   * Validate a single field against its rules
   */
  static validateField(field: FormField): string | null {
    for (const rule of field.rules) {
      const error = this.applyRule(field.value, rule);
      if (error) return error;
    }
    return null;
  }

  /**
   * Validate multiple fields
   */
  static validateFields(fields: FormField[]): ValidationResult {
    const errors: string[] = [];
    
    fields.forEach(field => {
      const error = this.validateField(field);
      if (error) {
        errors.push(`${field.name}: ${error}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Apply a specific validation rule
   */
  private static applyRule(value: string | number, rule: ValidationRule): string | null {
    switch (rule.type) {
      case 'required':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return rule.message;
        }
        break;

      case 'email':
        if (typeof value === 'string' && value && !this.isValidEmail(value)) {
          return rule.message;
        }
        break;

      case 'min':
        if (typeof value === 'number' && value < rule.value) {
          return rule.message;
        }
        if (typeof value === 'string' && value.length < rule.value) {
          return rule.message;
        }
        break;

      case 'max':
        if (typeof value === 'number' && value > rule.value) {
          return rule.message;
        }
        if (typeof value === 'string' && value.length > rule.value) {
          return rule.message;
        }
        break;

      case 'pattern':
        if (typeof value === 'string' && value && !rule.value.test(value)) {
          return rule.message;
        }
        break;
    }
    
    return null;
  }

  /**
   * Email validation helper
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate physics input parameters
   */
  static validatePhysicsInput(input: Record<string, any>): ValidationResult {
    const errors: string[] = [];

    // Check for required problem field
    if (!input.problem || !input.problem.trim()) {
      errors.push('Problem description is required');
    }

    // Validate numeric inputs if present
    const numericFields = ['area', 'thickness', 'density', 'velocity', 'mass', 'force'];
    numericFields.forEach(field => {
      if (input[field] !== undefined) {
        const value = Number(input[field]);
        if (isNaN(value) || value < 0) {
          errors.push(`${field} must be a valid positive number`);
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate design scenario input
   */
  static validateDesignScenario(input: { scenario?: string; material?: string }): ValidationResult {
    const errors: string[] = [];

    if (!input.scenario || !input.scenario.trim()) {
      errors.push('Design scenario is required');
    } else if (input.scenario.length < 10) {
      errors.push('Design scenario must be at least 10 characters long');
    }

    if (!input.material || !input.material.trim()) {
      errors.push('Material selection is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Sanitize input string
   */
  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove basic HTML characters
      .substring(0, 5000); // Limit length
  }

  /**
   * Validate and sanitize contact form
   */
  static validateContactForm(form: { name: string; email: string; message: string }): ValidationResult {
    const fields: FormField[] = [
      {
        name: 'name',
        value: form.name,
        rules: [
          { type: 'required', message: 'Name is required' },
          { type: 'min', value: 2, message: 'Name must be at least 2 characters' },
          { type: 'max', value: 50, message: 'Name must be less than 50 characters' }
        ]
      },
      {
        name: 'email',
        value: form.email,
        rules: [
          { type: 'required', message: 'Email is required' },
          { type: 'email', message: 'Please enter a valid email address' }
        ]
      },
      {
        name: 'message',
        value: form.message,
        rules: [
          { type: 'required', message: 'Message is required' },
          { type: 'min', value: 10, message: 'Message must be at least 10 characters' },
          { type: 'max', value: 1000, message: 'Message must be less than 1000 characters' }
        ]
      }
    ];

    return this.validateFields(fields);
  }
}
