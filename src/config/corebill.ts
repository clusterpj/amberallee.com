export const apiConfig = {
  endpoints: {
    auth: {
      login: '/api/corebill/auth/login',
      logout: '/api/corebill/auth/logout',
      me: '/api/corebill/me'
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
