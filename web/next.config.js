/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: '../docs',
  images: {
    unoptimized: true
  }
}

export default nextConfig