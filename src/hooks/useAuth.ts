import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { login, register, logout, UserLoginRequest, UserRegisterRequest } from '@/services/userService';
import { useToast } from './useToast';

/**
 * 封装所有认证相关逻辑的自定义 Hook
 */
export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const showToast = useToast();

    // 从 Zustand Store 中获取设置和清除用户的方法
    const { setUser, clearUser } = useUserStore();

    /**
     * 处理登录逻辑
     */
    const handleLogin = async (loginRequest: UserLoginRequest) => {
        setIsLoading(true);
        try {
            const loggedInUser = await login(loginRequest);
            setUser(loggedInUser); // 登录成功后，更新全局状态
            showToast({ message: `欢迎回来, ${loggedInUser.nickname}!`, type: 'success' });
            // 根据角色跳转到不同的仪表盘
            if (loggedInUser.role === 'TEACHER') {
                router.push('/teacher/studio');
            } else {
                router.push('/student/plaza'); // 假设学生首页是 plaza
            }
            return true; // 表示登录成功
        } catch (error: any) {
            // 错误提示已由 apiClient 统一处理
            console.error('Login failed:', error);
            return false; // 表示登录失败
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * 处理注册逻辑
     */
    const handleRegister = async (registerRequest: UserRegisterRequest) => {
        setIsLoading(true);
        // 前端基础校验
        if (!registerRequest.username || registerRequest.username.length < 4) {
            showToast({ message: '用户名长度不能小于4位', type: 'warning' });
            setIsLoading(false);
            return false;
        }
        if (!registerRequest.password || registerRequest.password.length < 6) {
            showToast({ message: '密码长度不能小于6位', type: 'warning' });
            setIsLoading(false);
            return false;
        }
        if (registerRequest.password !== registerRequest.checkPassword) {
            showToast({ message: '两次输入的密码不一致', type: 'warning' });
            setIsLoading(false);
            return false;
        }

        try {
            await register(registerRequest);
            showToast({ message: '注册成功！请使用新账号登录。', type: 'success' });
            return true; // 表示注册成功
        } catch (error: any) {
            console.error('Registration failed:', error);
            return false; // 表示注册失败
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * 处理注销逻辑
     */
    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout();
            clearUser(); // 清除全局用户状态
            showToast({ message: '您已成功退出登录', type: 'info' });
            router.push('/'); // 注销后跳转到首页
        } catch (error: any) {
            console.error('Logout failed:', error);
            // 即使后端退出失败，也强制清除前端状态
            clearUser();
            router.push('/');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleLogin,
        handleRegister,
        handleLogout,
    };
};