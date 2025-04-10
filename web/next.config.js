/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: '../docs',
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
