import { useState, useCallback, useRef, useEffect } from 'react';
import type { LoadingState, ValidationResult } from '@/types/common';
import { ErrorHandler } from '@/lib/error-handler';

/**
 * Enhanced hook for managing async operations with loading states
 */
export const useAsyncOperation = <T = any, P = any>(
  operation: (params: P) => Promise<T>
) => {
  const [state, setState] = useState<LoadingState & { data: T | null }>({
    isLoading: false,
    error: null,
    data: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (params: P) => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await operation(params);
      setState({ isLoading: false, error: null, data });
      return data;
    } catch (error) {
      const userError = ErrorHandler.formatUserError(error);
      setState({ isLoading: false, error: userError, data: null });
      throw error;
    }
  }, [operation]);

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null, data: null });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};

/**
 * Hook for managing form validation
 */
export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  validator: (values: T) => ValidationResult
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((name: keyof T, value: any) => {
    const tempValues = { ...values, [name]: value };
    const validation = validator(tempValues);
    
    const fieldError = validation.errors.find(error => 
      error.toLowerCase().includes(name.toString().toLowerCase())
    );

    setErrors(prev => ({
      ...prev,
      [name]: fieldError || ''
    }));

    return !fieldError;
  }, [values, validator]);

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate if field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  }, [touched, validateField]);

  const setTouched = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, values[name]);
  }, [values, validateField]);

  const validateAll = useCallback(() => {
    const validation = validator(values);
    const errorMap: Record<string, string> = {};
    
    validation.errors.forEach(error => {
      const [field, message] = error.split(': ');
      if (message) {
        errorMap[field] = message;
      }
    });

    setErrors(errorMap);
    setTouched(
      Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    return validation.isValid;
  }, [values, validator]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = Object.keys(errors).every(key => !errors[key]);

  return {
    values,
    errors,
    touched,
    isValid,
    setValue,
    setTouched,
    validateAll,
    reset,
  };
};

/**
 * Hook for managing local storage with error handling
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      ErrorHandler.logError(error, { key, operation: 'read' });
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      ErrorHandler.logError(error, { key, operation: 'write' });
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      ErrorHandler.logError(error, { key, operation: 'remove' });
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
};

/**
 * Hook for debouncing values
 */
export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for managing component mounting state
 */
export const useIsMounted = () => {
  const isMountedRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    setIsMounted(true);
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMounted;
};

/**
 * Hook for managing previous values
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
};
