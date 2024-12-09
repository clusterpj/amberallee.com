import { AxiosError } from 'axios';

class ApiError extends Error {
  success: boolean;
  errors?: Record<string, string[]>;
  statusCode?: number;

  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
    this.success = false;
  }
}

export const handleApiError = (error: AxiosError): ApiError => {
  const apiError = new ApiError(error.message);

  if (error.response) {
    switch (error.response.status) {
      case 401:
        apiError.message = 'Authentication required';
        break;
      case 422:
        apiError.message = 'Validation failed';
        apiError.errors = (error.response.data as any)?.errors || {};
        break;
      default:
        apiError.message = (error.response.data as any)?.message || 'An unexpected error occurred';
    }
    apiError.statusCode = error.response.status;
  }

  return apiError;
};
