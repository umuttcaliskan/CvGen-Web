/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**' // Tüm HTTPS domainlere izin ver
      }
    ],
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig 