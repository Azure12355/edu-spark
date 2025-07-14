import type {NextConfig} from "next";

const nextConfig: NextConfig = {

    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true, // 设置为 true，表示这是一个永久重定向 (HTTP 308)
            },
        ]
    },

    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
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
