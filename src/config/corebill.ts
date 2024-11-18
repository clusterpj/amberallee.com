export const apiConfig = {
  baseURL: '/api/corebill/',
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
