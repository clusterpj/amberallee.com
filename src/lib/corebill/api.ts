import apiClient from './client';

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
