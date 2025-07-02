// src/features/teacher/knowledge/knowledge-detail/hooks/useKnowledgeDetailPage.ts
"use client";

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

// 导入依赖的 Hooks 和类型
import { useKnowledgeDetail } from '@/features/teacher/knowledge/knowledge-detail/services/useKnowledgeDetail';
import { TABS_CONFIG } from '@/features/teacher/knowledge/knowledge-detail/components/view/KnowledgeDetailView';
import type { KnowledgeBaseVO } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService';

// 定义 Hook 返回值的类型，方便在组件中使用
interface UseKnowledgeDetailPageReturn {
    isLoading: boolean;
    isNotFound: boolean;
    kb: KnowledgeBaseVO | null;
    activeTab: string;
    handleTabChange: (tab: string) => void;
}

/**
 * @description 封装 KnowledgeDetailPage 的所有业务逻辑和状态管理。
 * @returns {UseKnowledgeDetailPageReturn} - 返回页面渲染所需的所有状态和事件处理器。
 */
export const useKnowledgeDetailPage = (): UseKnowledgeDetailPageReturn => {
    // --- Next.js 路由 Hooks ---
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    // --- 状态定义 ---
    const kbId = params?.id as string;
    const tabFromUrl = searchParams?.get('tab');

    // 内部状态，用于管理当前激活的 tab
    // 初始值通过 URL 参数或默认值确定
    const [activeTab, setActiveTab] = useState<string>(() => {
        const isValidTab = TABS_CONFIG.some(t => t.label === tabFromUrl);
        return isValidTab ? tabFromUrl! : TABS_CONFIG[0].label;
    });

    // --- 数据获取 Hook ---
    const { kb, isLoading, isNotFound } = useKnowledgeDetail(kbId);

    // --- 副作用 ---
    // 1. 当 isNotFound 变为 true 时，2.5秒后自动跳转回列表页
    useEffect(() => {
        if (isNotFound) {
            const timer = setTimeout(() => {
                router.push('/teacher/knowledge');
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isNotFound, router]);

    // --- 事件处理器 ---
    // 切换标签页的处理器
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        // 更新 URL，但不会重新加载页面，实现 URL 与 UI 同步
        const newUrl = `${window.location.pathname}?tab=${encodeURIComponent(tab)}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    };

    // --- 返回页面所需的所有数据和函数 ---
    return {
        isLoading,
        isNotFound,
        kb,
        activeTab,
        handleTabChange,
    };
};