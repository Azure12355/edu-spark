// src/app/teacher/(dashboard)/knowledge/[id]/KnowledgeDetailPage.tsx
"use client";

import React, {Suspense, useEffect} from 'react';
import {useParams, useRouter, useSearchParams} from 'next/navigation';

// --- 新的 Hooks 和组件 ---
import { useKnowledgeDetail } from '@/features/teacher/knowledge/knowledge-detail/services/useKnowledgeDetail';
import KnowledgeDetailView, {TABS_CONFIG} from '@/features/teacher/knowledge/knowledge-detail/components/view/KnowledgeDetailView';

// --- 样式和辅助组件 ---
import styles from './KnowledgeDetail.module.css'; // 复用原有的 centeredState, spinner 等样式

// --- 可复用的状态显示组件 ---
const LoadingState: React.FC<{ message: string }> = ({ message }) => (
    <div className={styles.centeredState}>
        <div className={styles.spinner}></div>
        <p>{message}</p>
    </div>
);

const NotFoundState: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/teacher/knowledge');
        }, 2500);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className={styles.centeredState}>
            <i className="fas fa-exclamation-triangle" style={{ fontSize: '48px', color: '#f59e0b' }}></i>
            <p style={{ fontSize: '18px', fontWeight: 600 }}>知识库不存在</p>
            <p>无法找到您要访问的资源，即将返回列表页...</p>
        </div>
    );
};

function KnowledgeDetailContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const kbId = params.id as string;

    // 1. 读取 URL 中的 'tab' 参数
    const tabFromUrl = searchParams.get('tab');

    // 2. 校验 tabFromUrl 是否是一个合法的标签页名称
    const isValidTab = TABS_CONFIG.some(t => t.label === tabFromUrl);
    const initialTab = isValidTab ? tabFromUrl : undefined;

    const { kb, isLoading, isNotFound } = useKnowledgeDetail(kbId);

    if (isLoading) {
        return <LoadingState message="正在加载知识库数据..." />;
    }

    if (isNotFound || !kb) {
        return <NotFoundState />;
    }

    // 3. 将验证过的 initialTab 传递给主视图组件
    return <KnowledgeDetailView kb={kb} initialTab={initialTab} />;
}


// 主页面组件现在只负责提供 Suspense 边界
export default function KnowledgeDetailPage() {
    return (
        <Suspense fallback={<LoadingState message="正在加载页面..." />}>
            <KnowledgeDetailContent />
        </Suspense>
    );
}