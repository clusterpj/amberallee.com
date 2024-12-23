import type { NextConfig } from 'next'

// Using const assertion for better type inference
const config = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost/api/v1/:path*'
      }
    ]
  }
}

export default config satisfies NextConfig
