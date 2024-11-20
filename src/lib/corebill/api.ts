import apiClient from './client';
import apiConfig, { getApiEndpoint } from './config';

export const corebillApi = {
  // Authentication
  auth: {
    login: (credentials) => apiClient.post(getApiEndpoint('auth.login'), credentials),
    me: () => apiClient.get(getApiEndpoint('auth.me')),
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
      return userId 
        ? apiClient.get(getApiEndpoint('users').replace('{id}', userId)) 
        : Promise.reject('No user logged in');
    }
  },

  // Orders
  orders: {
    create: (orderData) => apiClient.post(getApiEndpoint('orders.create'), orderData),
    get: (id) => apiClient.get(getApiEndpoint('orders.get').replace('{id}', id)),
    list: (params) => apiClient.get(getApiEndpoint('orders.list'), { params }),
    update: (id, data) => apiClient.put(getApiEndpoint('orders.update').replace('{id}', id), data)
  },

  // Payments
  payments: {
    getMethods: () => apiClient.get(getApiEndpoint('payments.methods')),
    create: (paymentData) => apiClient.post(getApiEndpoint('payments.create'), paymentData)
  },

  // Items (Special Editions)
  items: {
    list: (params) => apiClient.get(getApiEndpoint('items.list'), { params }),
    get: (id) => apiClient.get(getApiEndpoint('items.get').replace('{id}', id)),
    update: (id, data) => apiClient.put(getApiEndpoint('items.update').replace('{id}', id), data)
  }
};
