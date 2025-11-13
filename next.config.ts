import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Add your image domains here
  },
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
  env: {
    API_URL: process.env.API_URL, // Add your API URL here
  },
};

export default nextConfig;
