// [!file src/shared/hooks/useConfirmationModal.ts]
import { create } from 'zustand';
import { ReactNode } from 'react';

/**
 * 确认弹窗的类型，用于决定图标和按钮的颜色主题。
 */
export type ConfirmationType = 'warning' | 'danger' | 'info';

/**
 * 调用确认弹窗时需要传入的配置参数。
 */
interface ConfirmationOptions {
    title: string;
    message: string | ReactNode;
    confirmText?: string;
    cancelText?: string;
    type?: ConfirmationType;
    isConfirming?: boolean;
    onConfirm: () => void | Promise<void>;
}

/**
 * Zustand Store 的状态接口。
 */
interface ConfirmationState {
    isOpen: boolean;
    options: ConfirmationOptions | null;
    showModal: (options: ConfirmationOptions) => void;
    hideModal: () => void;
    setIsConfirming: (isConfirming: boolean) => void;
}

/**
 * 创建并导出用于管理全局确认弹窗状态的 Zustand Store。
 */
const useConfirmationStore = create<ConfirmationState>((set) => ({
    isOpen: false,
    options: null,
    showModal: (options) => set({ isOpen: true, options }),
    hideModal: () => set({ isOpen: false, options: null }),
    setIsConfirming: (isConfirming) => set(state => ({
        options: state.options ? { ...state.options, isConfirming } : null
    })),
}));

/**
 * 这是一个便捷的 Hook，外部组件只需调用此 Hook 即可显示确认弹窗。
 * 它隐藏了 Zustand Store 的实现细节。
 *
 * @example
 * const confirm = useConfirmationModal();
 * confirm({
 *   title: '确认删除',
 *   message: '此操作不可撤销，确定吗？',
 *   onConfirm: () => { console.log('Deleted!'); }
 * });
 */
export const useConfirmationModal = () => useConfirmationStore((state) => state.showModal);


/**
 * 这是一个专为 ConfirmationModal 组件自身使用的 Hook。
 * 它提供了关闭弹窗和更新加载状态的能力。
 */
export const useConfirmationModalActions = () => {
    const { hideModal, setIsConfirming } = useConfirmationStore();
    return { hideModal, setIsConfirming };
};

/**
 * 这是一个专为 ConfirmationModal 组件自身使用的 Hook。
 * 它提供了弹窗是否可见及其配置选项。
 */
export const useConfirmationModalState = () => {
    const { isOpen, options } = useConfirmationStore();
    return { isOpen, options };
};