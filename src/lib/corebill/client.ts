import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_COREBILL_API_URL || '/api/proxy',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

apiClient.interceptors.request.use(
  async (config) => {
    // Check if running on client-side before accessing localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('corebill_token');
      const tokenType = localStorage.getItem('corebill_token_type') || 'Bearer';
      
      if (token) {
        config.headers.Authorization = `${tokenType} ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login on unauthorized
      if (typeof window !== 'undefined') {
        localStorage.removeItem('corebill_token');
        localStorage.removeItem('corebill_token_type');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
