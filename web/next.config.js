/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/frui',
  output: 'export',
  trailingSlash: true,
  distDir: '../docs',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
