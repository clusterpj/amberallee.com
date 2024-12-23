import type { NextConfig } from 'next'
import type { SizeLimit } from 'next/types'

// Using const assertion for better type inference
const config = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: 2_097_152 // 2MB in bytes
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
