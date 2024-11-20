const environment = process.env.NODE_ENV || 'development';
const isProd = environment === 'production';

export const apiConfig = {
  baseURL: isProd ? 'https://yukikaze/api' : '/api',
  version: '',
  timeout: 30000,
  endpoints: {
    auth: {
      login: 'auth/login',
      logout: 'auth/logout',
      me: 'auth/me'
    },
    orders: {
      create: 'invoices',
      get: 'invoices/{id}',
      list: 'invoices',
      update: 'invoices/{id}'
    },
    payments: {
      methods: 'payments/multiple/get-payment-methods',
      create: 'payments/multiple/create'
    },
    items: {
      list: 'items',
      get: 'items/{id}',
      update: 'items/{id}'
    }
  }
};

/**
 * Formats an endpoint path to include the API version
 * @param {string} endpoint - The endpoint path
 * @returns {string} The formatted endpoint URL
 */
export function getEndpointUrl(endpoint: string): string {
  return `/${apiConfig.version}/${endpoint.replace(/^\/+|\/+$/g, '')}`
}

/**
 * Gets the endpoint path from the configuration
 * @param {string} endpointPath - Dot notation path to the endpoint (e.g., 'orders.create')
 * @returns {string} The endpoint path
 */
export function getApiEndpoint(endpointPath: string): string {
  const parts = endpointPath.split('.')
  let current: any = apiConfig.endpoints
  
  for (const part of parts) {
    if (!current[part]) {
      return endpointPath
    }
    current = current[part]
  }
  
  return current
}

export default apiConfig
