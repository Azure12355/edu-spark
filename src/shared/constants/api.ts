const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, '');

/**
 * 统一的前端 API 基础地址:
 * 1) 优先使用构建时注入的 NEXT_PUBLIC_API_BASE_URL
 * 2) 未配置时回退到同域反向代理路径 /api
 */
export const API_BASE_URL = rawApiBaseUrl ? normalizeBaseUrl(rawApiBaseUrl) : '/api';
