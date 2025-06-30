import axios, { AxiosError } from 'axios';
import { useToastStore } from '@/hooks/useToast'; // 引入我们之前创建的 Toast Store

/**
 * 后端返回的标准响应体结构
 */
interface ApiResponse<T = any> {
    code: number;
    data: T;
    message: string;
}

// 1. 创建 Axios 实例
const apiClient = axios.create({
    // 从环境变量中读取 API 基础路径，如果没有则使用本地开发地址
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8101/api',
    // 设置请求超时时间
    timeout: 10000,
    // 允许跨域请求携带 cookie (对于 session 认证至关重要)
    withCredentials: true,
});

// 2. 添加请求拦截器 (Request Interceptor)
apiClient.interceptors.request.use(
    (config) => {
        // 在这里可以统一处理请求头，例如添加 token
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 3. 添加响应拦截器 (Response Interceptor)
apiClient.interceptors.response.use(
    (response) => {
        // --- 成功的响应处理 ---
        const res: ApiResponse = response.data;

        // 业务成功 (code === 0)，直接返回解包后的 data
        if (res.code === 0) {
            return res.data;
        }

        // 业务失败 (code !== 0)，集中处理业务异常
        console.error('API Business Error:', res.message);

        // 使用 Toast 显示业务错误信息
        useToastStore.getState().showToast({
            message: res.message || '操作失败，请稍后重试',
            type: 'error',
        });

        // 拒绝 Promise，让调用处的 .catch() 可以捕获到
        return Promise.reject(new Error(res.message));
    },
    (error: AxiosError) => {
        // --- 失败的响应处理 (网络错误、服务器错误等) ---
        console.error('API Network Error:', error.message);

        // 默认的错误消息
        let errorMessage = '网络请求异常，请检查您的网络连接';

        if (error.response) {
            // 服务器返回了响应，但状态码不是 2xx
            const status = error.response.status;
            // 尝试从后端返回的 data 中获取更具体的错误信息
            const responseData = error.response.data as ApiResponse;
            errorMessage = responseData?.message || `服务器错误，状态码: ${status}`;

            // 针对特定状态码进行处理
            if (status === 401) {
                errorMessage = '登录状态已过期，请重新登录';
                // TODO: 在这里可以触发跳转到登录页的操作
                // window.location.href = '/login';
            } else if (status === 403) {
                errorMessage = '您没有权限执行此操作';
            } else if (status === 404) {
                errorMessage = '请求的资源未找到';
            }
        } else if (error.request) {
            // 请求已发出，但没有收到响应 (例如网络断开)
            errorMessage = '无法连接到服务器，请检查网络';
        }

        // 使用 Toast 显示最终的错误信息
        useToastStore.getState().showToast({
            message: errorMessage,
            type: 'error',
        });

        return Promise.reject(error);
    }
);

export default apiClient;