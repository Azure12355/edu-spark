// [!file src/app/ClientLayoutWrapper.tsx]
"use client"; // This component is a Client Component

import React from 'react';
import ToastProvider from "@/shared/components/ui/Toast/Toast";
import AuthModal from "@/shared/components/common/auth/AuthModal";
import { useUserStore } from "@/shared/store/userStore";

// This component now encapsulates all client-side logic
export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const { isAuthModalOpen, closeAuthModal } = useUserStore();

    return (
        <>
            {children}
            <ToastProvider />
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
        </>
    );
}