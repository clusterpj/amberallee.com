import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/proxy',
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
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
