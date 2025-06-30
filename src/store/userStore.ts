import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserVO } from '@/services/userService'; // 从我们之前创建的 service 中导入类型

// 1. 定义 Store 的状态和操作的类型
interface UserState {
    loginUser: UserVO | null;
    isLoggedIn: boolean;
    // Actions
    setUser: (user: UserVO | null) => void;
    clearUser: () => void;
}

// 2. 创建 Store
export const useUserStore = create<UserState>()(
    // 3. 使用 persist 中间件进行数据持久化
    persist(
        (set) => ({
            // 初始状态
            loginUser: null,
            isLoggedIn: false,

            // 操作：设置用户信息
            setUser: (user) => {
                set({
                    loginUser: user,
                    isLoggedIn: !!user, // 如果 user 不为 null, isLoggedIn 为 true
                });
            },

            // 操作：清除用户信息（用于注销）
            clearUser: () => {
                set({
                    loginUser: null,
                    isLoggedIn: false,
                });
            },
        }),
        {
            name: 'user-login-status', // 在 localStorage 中的键名
            storage: createJSONStorage(() => localStorage), // 指定使用 localStorage
        }
    )
);