"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

interface AuthGuardProps {
    children: React.ReactNode;
}

/**
 * 一个客户端组件，用于保护需要认证的路由。
 * 它会检查全局的登录状态，如果未登录，则重定向到首页。
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isLoggedIn } = useUserStore();

    useEffect(() => {
        // 如果用户未登录，并且当前路径不是公开路径（如首页'/'），则重定向
        if (!isLoggedIn && pathname !== '/') {
            console.log("AuthGuard: User not logged in, redirecting to home.");
            router.replace('/'); // 使用 replace 避免在历史记录中留下受保护的页面
        }
    }, [isLoggedIn, pathname, router]);

    // 如果已登录，或者是在公开页面，则正常渲染子组件
    if (isLoggedIn || pathname === '/') {
        return <>{children}</>;
    }

    // 如果未登录且正在重定向，可以显示一个加载状态或 null
    return null;
};

export default AuthGuard;