import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_COREBILL_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

apiClient.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${process.env.COREBILL_API_KEY}`;
    return config;
  },
  (error) => Promise.reject(error)
);import axios from 'axios';

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

export default apiClient;
