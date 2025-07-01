import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useToastStore } from '@/shared/hooks/useToast';
import { useUserStore } from '@/shared/store/userStore';

/**
 * 后端返回的标准响应体结构
 */
interface ApiResponse<T = any> {
    code: number;
    data: T;
    message: string;
}

// 全局标志位，防止因并发请求的401错误导致多次重定向
let isRedirecting = false;

// 1. 创建 Axios 实例 (配置保持不变)
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8101/api',
    timeout: 10000,
    withCredentials: true,
});

// 2. 请求拦截器 (Request Interceptor)
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 【扩展点】: 未来如果使用 JWT，可以在这里统一添加认证头
        // const token = useUserStore.getState().token; // 假设 token 存储在 userStore 中
        // if (token && config.headers) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. 响应拦截器 (Response Interceptor)
apiClient.interceptors.response.use(
    (response) => {
        const res: ApiResponse = response.data;
        if (res.code === 0) {
            return res.data; // 直接返回 data，简化业务层调用
        }

        // 处理后端返回的业务错误 (code !== 0)
        console.error('API Business Error:', res);
        useToastStore.getState().showToast({
            message: res.message || '操作失败，请稍后重试',
            type: 'error',
        });

        if (res.code === 40100) {
            // 【核心逻辑】: 处理认证失败
            const errorMessage = '登录状态已过期，请重新登录';

            // 检查是否正在重定向，防止重复触发
            if (!isRedirecting) {
                isRedirecting = true;
                // 使用 Toast 提示用户
                useToastStore.getState().showToast({ message: errorMessage, type: 'warning' });

                // 清除本地的用户状态
                useUserStore.getState().clearUser();

                // 延迟一小段时间后重定向到首页，给Toast显示的时间
                setTimeout(() => {
                    window.location.href = '/'; // 使用原生跳转，强制刷新页面和状态
                    isRedirecting = false;
                }, 1500);
            }
        }

        // 【重要】: 即使是业务错误，也应该以 reject 的形式抛出，
        // 这样 .catch() 逻辑才能捕获到，防止业务代码继续执行 .then()。
        return Promise.reject(new Error(res.message));
    },
    (error: AxiosError) => {
        console.error('API Network/Server Error:', error);

        // 如果没有 error.response，说明是网络断开或请求超时等客户端错误
        if (!error.response) {
            useToastStore.getState().showToast({
                message: '网络请求异常，请检查您的网络连接',
                type: 'error',
            });
            return Promise.reject(error);
        }

        // --- 有响应的服务器错误处理 ---
        const status = error.response.status;
        const responseData = error.response.data as ApiResponse;
        let errorMessage = responseData?.message || `服务器内部错误，状态码: ${status}`;

        switch (status) {
            case 401: // 未授权 (未登录或Session过期)
                // 【核心逻辑】: 处理认证失败
                errorMessage = '登录状态已过期，请重新登录';

                // 检查是否正在重定向，防止重复触发
                if (!isRedirecting) {
                    isRedirecting = true;
                    // 使用 Toast 提示用户
                    useToastStore.getState().showToast({ message: errorMessage, type: 'warning' });

                    // 清除本地的用户状态
                    useUserStore.getState().clearUser();

                    // 延迟一小段时间后重定向到首页，给Toast显示的时间
                    setTimeout(() => {
                        window.location.href = '/'; // 使用原生跳转，强制刷新页面和状态
                        isRedirecting = false;
                    }, 1500);
                }
                break;

            case 403: // 禁止访问 (无权限)
                errorMessage = '您没有权限执行此操作';
                useToastStore.getState().showToast({ message: errorMessage, type: 'error' });
                break;

            case 404: // 未找到
                errorMessage = '请求的资源不存在';
                useToastStore.getState().showToast({ message: errorMessage, type: 'error' });
                break;

            case 500:
                errorMessage = "服务器开小差了，请稍后重试~";
                useToastStore.getState().showToast({ message: errorMessage, type: 'error' });
                break;

            default:
                // 其他 HTTP 错误
                useToastStore.getState().showToast({ message: errorMessage, type: 'error' });
                break;
        }

        return Promise.reject(error);
    }
);

export default apiClient;