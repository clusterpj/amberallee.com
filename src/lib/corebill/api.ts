import apiClient from './client';
import apiConfig, { getApiEndpoint } from './config';
import { AxiosError } from 'axios';

export const corebillApi = {
  // Authentication
  auth: {
    /**
     * Authenticate user
     * @param {Object} credentials - Login credentials
     * @param {string} credentials.email - User email/username
     * @param {string} credentials.password - User password
     * @returns {Promise<Object>}
     */
    async login(credentials: { email: string; password: string }) {
      try {
        const response = await apiClient.post(getApiEndpoint('auth.login'), {
          username: credentials.email, // API expects username
          password: credentials.password,
          device_name: 'web' // Default device name for web client
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 422) {
            throw {
              message: 'Invalid credentials',
              details: error.response.data.errors || {}
            };
          }
        }
        throw error;
      }
    },

    /**
     * Logout user
     * @returns {Promise<void>}
     */
    async logout() {
      try {
        await apiClient.post(getApiEndpoint('auth.logout'));
      } finally {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('corebill_token');
          localStorage.removeItem('corebill_token_type');
          localStorage.removeItem('corebill_role');
          localStorage.removeItem('corebill_user_id');
          window.location.href = '/login';
        }
      }
    },

    /**
     * Get current user profile
     * @returns {Promise<Object>}
     */
    async getProfile() {
      return apiClient.get(getApiEndpoint('auth.me'));
    },

    /**
     * Get current user
     * @returns {Promise<Object>}
     */
    getCurrentUser() {
      const userId = typeof window !== 'undefined' ? localStorage.getItem('corebill_user_id') : null;
      return userId 
        ? apiClient.get(getApiEndpoint('users').replace('{id}', userId)) 
        : Promise.reject('No user logged in');
    }
  },

  // Orders
  orders: {
    create: (orderData: any) => apiClient.post(getApiEndpoint('orders.create'), orderData),
    get: (id: string) => apiClient.get(getApiEndpoint('orders.get').replace('{id}', id)),
    list: (params: any) => apiClient.get(getApiEndpoint('orders.list'), { params }),
    update: (id: string, data: any) => apiClient.put(getApiEndpoint('orders.update').replace('{id}', id), data)
  },

  // Payments
  payments: {
    getMethods: () => apiClient.get(getApiEndpoint('payments.methods')),
    create: (paymentData: any) => apiClient.post(getApiEndpoint('payments.create'), paymentData)
  },

  // Items (Special Editions)
  items: {
    list: (params: any) => apiClient.get(getApiEndpoint('items.list'), { params }),
    get: (id: string) => apiClient.get(getApiEndpoint('items.get').replace('{id}', id)),
    update: (id: string, data: any) => apiClient.put(getApiEndpoint('items.update').replace('{id}', id), data)
  }
};
