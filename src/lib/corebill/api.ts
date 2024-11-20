import apiClient from './client';

export const corebillApi = {
  // Authentication
  auth: {
    login: (credentials) => apiClient.post('auth/login', credentials),
    me: () => apiClient.get('me'),
    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('corebill_token');
        localStorage.removeItem('corebill_token_type');
        localStorage.removeItem('corebill_role');
        localStorage.removeItem('corebill_user_id');
        window.location.href = '/login';
      }
    },
    getCurrentUser: () => {
      const userId = typeof window !== 'undefined' ? localStorage.getItem('corebill_user_id') : null;
      return userId ? apiClient.get(`users/${userId}`) : Promise.reject('No user logged in');
    }
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
import apiClient from './client';
import { handleApiError } from './utils';

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
