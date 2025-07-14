"use client"; // 1. 将 page.tsx 标记为客户端组件的入口

import React, { Suspense } from 'react';
import AssistantPage from "@/features/teacher/assistant/AssistantPage";

/**
 * 这是实际渲染的、包含客户端逻辑的组件。
 * 之前您的 useTeacherAssistant Hook 在这里被调用，
 * 这就是为什么 Next.js 要求一个 Suspense 边界。
 */
function AssistantClientComponent() {
    // AssistantPage 组件内部会调用 useTeacherAssistant，
    // 而 useTeacherAssistant 调用了 useSearchParams。
    return <AssistantPage />;
}

/**
 * 这是一个新的包装页面组件。
 * 它负责设置 Suspense 边界。
 */
export default function AssistantSuspenseWrapper() {
    return (
        <Suspense fallback={<LoadingState />}>
            <AssistantClientComponent />
        </Suspense>
    );
}

/**
 * 一个简单的加载状态组件，用于在 Suspense 边界中显示。
 * 您可以根据需要设计更精美的骨架屏（Skeleton）。
 */
const LoadingState = () => {
    const loadingStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        fontSize: '18px',
        color: '#6b7280',
        backgroundColor: '#f9fafb',
    };
    return (
        <div style={loadingStyle}>
            <i className="fas fa-spinner fa-spin" style={{ marginRight: '12px' }}></i>
            正在加载智能助教...
        </div>
    );
};