export const apiConfig = {
  baseURL: process.env.COREBILL_API_URL || 'https://api.corebill.com/v1/',
  endpoints: {
    auth: {
      login: 'auth/login',
      logout: 'auth/logout',
      me: 'me'
    },
    orders: {
      create: 'invoices',
      get: 'invoices'
    },
    payments: {
      methods: 'payments/multiple/get-payment-methods',
      create: 'payments/multiple/create'
    },
    items: 'items'
  }
}
