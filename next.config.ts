import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lf3-static.bytednsdoc.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lf-volc-website.volccdn.com',
        port: '',
        pathname: '/**',
      },
    ]
  }
};

export default nextConfig;
