// src/hooks/useToast.ts
import { create } from 'zustand';

// 定义 Toast 的类型
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// 定义 Toast 消息的结构
interface ToastMessage {
    id: number;
    message: string;
    type: ToastType;
}

// 定义 Toast 存储的状态和操作
interface ToastState {
    toasts: ToastMessage[];
    showToast: (toast: Omit<ToastMessage, 'id'> & { duration?: number }) => void;
    removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
    toasts: [],
    showToast: ({ message, type, duration = 3000 }) => {
        const id = Date.now();
        set((state) => ({
            toasts: [...state.toasts, { id, message, type }],
        }));
        // 在指定时间后自动移除
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((toast) => toast.id !== id),
            }));
        }, duration);
    },
    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
    },
}));

// 导出一个易于使用的 hook
export const useToast = () => useToastStore((state) => state.showToast);