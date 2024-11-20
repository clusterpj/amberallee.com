import { AxiosError } from 'axios';

interface ErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export const handleApiError = (error: AxiosError): ErrorResponse => {
  const errorResponse: ErrorResponse = {
    success: false,
    message: error.message,
    errors: {}
  };

  if (error.response) {
    switch (error.response.status) {
      case 401:
        errorResponse.message = 'Authentication required';
        break;
      case 422:
        errorResponse.message = 'Validation failed';
        errorResponse.errors = (error.response.data as any)?.errors || {};
        break;
      default:
        errorResponse.message = (error.response.data as any)?.message || 'An unexpected error occurred';
    }
    errorResponse.statusCode = error.response.status;
  }

  return errorResponse;
};
