import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {UserVO} from "@/shared/types";

// 1. 定义 Store 的状态和操作的类型
interface UserState {
    loginUser: UserVO | null;
    isLoggedIn: boolean;
    hasHydrated: boolean;

    isAuthModalOpen: boolean; // 新增：控制全局登录弹窗的开关
    onLoginSuccessCallback: (() => void) | null; // 新增：登录成功后的回调函数

    openAuthModal: (onSuccess?: () => void) => void; // 新增：打开弹窗的 action
    closeAuthModal: () => void; // 新增：关闭弹窗的 action

    // Actions
    setUser: (user: UserVO | null) => void;
    clearUser: () => void;
    setHasHydrated: (state: boolean) => void;
}

// 2. 创建 Store
export const useUserStore = create<UserState>()(
    // 3. 使用 persist 中间件进行数据持久化
    persist(
        (set, get) => ({
            // 初始状态
            loginUser: null,
            isLoggedIn: false,
            hasHydrated: false,


            isAuthModalOpen: false,
            onLoginSuccessCallback: null,

            openAuthModal: (onSuccess) => {
                set({
                    isAuthModalOpen: true,
                    // 如果传入了成功回调，就存储它
                    onLoginSuccessCallback: onSuccess || null
                });
            },
            closeAuthModal: () => {
                set({ isAuthModalOpen: false, onLoginSuccessCallback: null });
            },

            // 操作：设置用户信息
            setUser: (user) => {
                set({
                    loginUser: user,
                    isLoggedIn: !!user, // 如果 user 不为 null, isLoggedIn 为 true
                });

                const callback = get().onLoginSuccessCallback;
                if (callback) {
                    callback();
                }
                // 执行完后清除
                set({ onLoginSuccessCallback: null });
            },

            // 操作：清除用户信息（用于注销）
            clearUser: () => {
                set({
                    loginUser: null,
                    isLoggedIn: false,
                });
            },

            setHasHydrated: (state) => {
                set({
                    hasHydrated: state
                });
            },

        }),
        {
            name: 'user-login-status', // 在 localStorage 中的键名
            storage: createJSONStorage(() => localStorage), // 指定使用 localStorage
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setHasHydrated(true);
                }
            }
        }
    )
);

export const useAuthModal = () => useUserStore((state) => state.openAuthModal);
