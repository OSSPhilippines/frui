/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/frui',
  output: 'export',
  distDir: '../docs',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
