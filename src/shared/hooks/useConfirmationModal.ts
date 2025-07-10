// [!file src/shared/hooks/useConfirmationModal.ts]
import { create } from 'zustand';
import { ReactNode } from 'react';

export type ConfirmationType = 'warning' | 'danger' | 'info';

export interface ConfirmationOptions {
    title: string;
    message: string | ReactNode;
    confirmText?: string;
    cancelText?: string;
    type?: ConfirmationType;
    isConfirming?: boolean;
    onConfirm: () => void | Promise<void>;
}

interface ConfirmationState {
    isOpen: boolean;
    options: ConfirmationOptions | null;

    // [code focus start ++]
    showModal: (options: ConfirmationOptions) => void; // 1. 修正类型
    // [code focus end ++]
    hideModal: () => void;
    setIsConfirming: (isConfirming: boolean) => void;
}

const useConfirmationStore = create<ConfirmationState>((set) => ({
    isOpen: false,
    options: null,

    // [code focus start ++]
    showModal: (options) => set({ isOpen: true, options: { ...options, isConfirming: false } }), // 2. 确保每次打开时 isConfirming 为 false
    // [code focus end ++]
    hideModal: () => set({ isOpen: false, options: null }),
    setIsConfirming: (isConfirming) => set(state => ({
        options: state.options ? { ...state.options, isConfirming } : null
    })),
}));


// [code focus start ++]
// 3. 修正导出的 Hook，现在它是一个直接可调用的函数
export const useConfirmationModal = () => useConfirmationStore((state) => state.showModal);
// [code focus end ++]

export const useConfirmationModalActions = () => {
    const { hideModal, setIsConfirming } = useConfirmationStore();
    return { hideModal, setIsConfirming };
};

export const useConfirmationModalState = () => {
    const { isOpen, options } = useConfirmationStore();
    return { isOpen, options };
};