// [!file src/app/ClientLayoutWrapper.tsx]
"use client"; // This component is a Client Component

import React from 'react';
import ToastProvider from "@/shared/components/ui/Toast/Toast";
import AuthModal from "@/shared/components/common/auth/AuthModal";
import {useUserStore} from "@/shared/store/userStore";
import ConfirmationModal from "@/shared/components/ui/ConfirmationModal/ConfirmationModal";

// This component now encapsulates all client-side logic
export default function ClientLayoutWrapper({children}: { children: React.ReactNode }) {
    const {isAuthModalOpen, closeAuthModal} = useUserStore();

    return (
        <>
            {children}
            <ToastProvider/>
            <ConfirmationModal/>
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal}/>
        </>
    );
}