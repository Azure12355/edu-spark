import type {NextConfig} from "next";

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
            {
                protocol: 'https',
                hostname: 'img3.doubanio.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'img9.doubanio.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'example.com',
                port: '',
                pathname: '/**',
            },

            {
                protocol: 'https',
                hostname: 'img1.doubanio.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'example.com',
                port: '',
                pathname: '/**',
            }
        ]
    }
};

export default nextConfig;
