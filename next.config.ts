/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig
