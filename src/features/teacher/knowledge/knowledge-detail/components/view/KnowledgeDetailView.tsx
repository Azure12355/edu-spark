// src/features/teacher/knowledge/knowledge-detail/components/view/KnowledgeDetailView.tsx
"use client";

import React from 'react';
import { KnowledgeBaseVO } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService';

// --- 子组件和布局 ---
import KnowledgeDetailLayout from '../layout/KnowledgeDetailLayout';
import KnowledgeBaseInfo from '@/features/teacher/knowledge/knowledge-detail/sub-features/basic-info/KnowledgeBaseInfo';
import ChunkManagementTab from "@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management";
import DocumentManagementTab from "@/features/teacher/knowledge/knowledge-detail/sub-features/document-management/DocumentManagementTab";

import styles from './KnowledgeDetailView.module.css';

export const TABS_CONFIG = [
    { id: 'BasicInfo', label: '基本信息' },
    { id: 'Documents', label: '原始文档' },
    { id: 'Chunks', label: '切片详情' },
    { id: 'RetrievalTest', label: '知识检索' },
    { id: 'QATest', label: '知识问答' },
    { id: 'Statistics', label: '使用统计' },
];

interface KnowledgeDetailViewProps {
    kb: KnowledgeBaseVO;
    activeTab: string | null;
    onTabChange: (tab: string) => void;
}

// [!code focus start]
const KnowledgeDetailView: React.FC<KnowledgeDetailViewProps> = ({ kb, activeTab, onTabChange }) => {
// [!code focus end]

    // --- 渲染不同标签页内容的函数 ---
    const renderTabContent = () => {
        switch (activeTab) {
            case '基本信息':
                return <KnowledgeBaseInfo kb={kb} />;

            case '原始文档':
                return <DocumentManagementTab kbId={kb.id} />;

            case '切片详情':
                return (
                    <ChunkManagementTab
                        kbId={kb.id}
                        documents={[]} // 假设这个依赖可以被优化掉或从 kb prop 中获取
                    />
                );

            default:
                return (
                    <div className={styles.centeredMessage}>
                        <p>{activeTab} 功能正在开发中...</p>
                    </div>
                );
        }
    };

    return (
        <KnowledgeDetailLayout
            kb={kb}
            activeTab={activeTab}
            onTabChange={onTabChange} // 将从 props 接收的回调函数传递下去
            tabContent={renderTabContent()}
        />
    );
};

export default KnowledgeDetailView;