import { AxiosError } from 'axios';

export interface AuthErrorResponse {
  success: boolean;
  message: string;
  details?: Record<string, string[]>;
}

export function handleAuthError(error: AxiosError): AuthErrorResponse {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        return {
          success: false,
          message: 'Authentication failed. Please check your credentials.',
        };
      case 422:
        return {
          success: false,
          message: 'Validation error',
          details: (error.response.data as any)?.errors || {},
        };
      default:
        return {
          success: false,
          message: (error.response.data as any)?.message || 'An unexpected error occurred',
        };
    }
  }
  
  return {
    success: false,
    message: error.message || 'Network error. Please try again.',
  };
}
