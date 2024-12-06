// src/lib/corebill/client.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.COREBILL_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('corebill_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// src/lib/corebill/api.js
export const corebillApi = {
  // Authentication
  auth: {
    login: (credentials) => apiClient.post('auth/login', credentials),
    me: () => apiClient.get('me')
  },

  // Orders
  orders: {
    create: (orderData) => apiClient.post('invoices', orderData),
    get: (id) => apiClient.get(`invoices/${id}`),
    list: (params) => apiClient.get('invoices', { params }),
    update: (id, data) => apiClient.put(`invoices/${id}`, data)
  },

  // Payments
  payments: {
    getMethods: () => apiClient.get('payments/multiple/get-payment-methods'),
    create: (paymentData) => apiClient.post('payments/multiple/create', paymentData)
  },

  // Items (Special Editions)
  items: {
    list: (params) => apiClient.get('items', { params }),
    get: (id) => apiClient.get(`items/${id}`),
    update: (id, data) => apiClient.put(`items/${id}`, data)
  }
};

// src/lib/corebill/utils.js
export const handleApiError = (error) => {
  const errorResponse = {
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
        errorResponse.errors = error.response.data.errors || {};
        break;
      default:
        errorResponse.message = error.response.data?.message || 'An unexpected error occurred';
    }
    errorResponse.statusCode = error.response.status;
  }

  throw errorResponse;
};

// src/lib/corebill/hooks/useCorebill.js
import { useState } from 'react';
import { corebillApi } from '../api';

export const useCorebill = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (orderData) => {
    setLoading(true);
    try {
      const response = await corebillApi.orders.create(orderData);
      return response.data;
    } catch (err) {
      setError(handleApiError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async (paymentData) => {
    setLoading(true);
    try {
      const response = await corebillApi.payments.create(paymentData);
      return response.data;
    } catch (err) {
      setError(handleApiError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createOrder,
    processPayment,
    api: corebillApi
  };
};