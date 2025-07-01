"use client";

import React, { useState, useEffect } from 'react';
import { KnowledgeBaseVO } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService';

// --- 自定义 Hooks ---
import { useDocumentManagement } from '@/features/teacher/knowledge/knowledge-detail/services/useDocumentManagement';
import { useChunkManagement } from '@/features/teacher/knowledge/knowledge-detail/services/useChunkManagement';
import { useDocumentTable } from '@/features/teacher/knowledge/knowledge-detail/services/useDocumentTable';

// --- 子组件 ---
import KnowledgeDetailLayout from '../layout/KnowledgeDetailLayout';
import Pagination from '@/shared/components/ui/Pagination/Pagination';
import KnowledgeBaseInfo from '../tabs/basic-info/KnowledgeBaseInfo';
import DocumentToolbar from '../tabs/documents/DocumentToolbar';
import DocumentTable from '../tabs/documents/DocumentTable';
import ChunkToolbar from "../../sub-features/chunk-management/components/ChunkToolbar";
import ChunkGrid from "../tabs/chunks/ChunkGrid";
import AddChunkModal from "../tabs/chunks/AddChunkModal";

import styles from './KnowledgeDetailView.module.css';
import ChunkManagementTab from "@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management";

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
    initialTab?: string | null;
}

const KnowledgeDetailView: React.FC<KnowledgeDetailViewProps> = ({ kb, initialTab }) => {
    // --- 统一的状态和 Hooks 管理 ---
    const [activeTab, setActiveTab] = useState<string>(initialTab || TABS_CONFIG[0].label);
    const [isChunkModalOpen, setIsChunkModalOpen] = useState(false);

    // --- 各功能模块的逻辑 Hooks 在顶层调用 ---
    const documentManager = useDocumentManagement(kb.id);
    const chunkManager = useChunkManagement(kb.id); // 不再需要传递 documents

    // UI Hook 依赖于数据 Hook 的结果
    const tableManager = useDocumentTable(documentManager.documents.map(d => d.id));

    // 当文档数据变化时，清空表格选择
    useEffect(() => {
        tableManager.clearSelection();
    }, [documentManager.documents, tableManager.clearSelection]);

    // --- 渲染不同标签页内容的函数 ---
    const renderTabContent = () => {
        switch(activeTab) {
            case '基本信息':
                return <KnowledgeBaseInfo kb={kb} />;

            case '原始文档':
                return (
                    <div className={styles.tabContentContainer}>
                        <DocumentToolbar
                            selectionCount={tableManager.selectedIds.size}
                            onDelete={() => documentManager.handleDeleteSelected(tableManager.selectedIds)}
                        />
                        <div className={styles.tableContainer}>
                            <DocumentTable
                                documents={documentManager.documents}
                                isLoading={documentManager.isLoading}
                                selectedIds={tableManager.selectedIds}
                                areAllSelected={tableManager.areAllSelected}
                                onToggleRow={tableManager.toggleSelection}
                                onToggleAllRows={tableManager.toggleAllSelection}
                            />
                        </div>
                        {documentManager.pagination.totalItems > 0 && (
                            <Pagination {...documentManager.pagination} onPageChange={documentManager.handlePageChange} />
                        )}
                    </div>
                );

            case '切片详情':
                return (
                    <ChunkManagementTab
                        kbId={kb.id}
                        documents={documentManager.documents} // 传入文档列表用于筛选
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
            onTabChange={setActiveTab}
            tabContent={renderTabContent()}
        />
    );
};

export default KnowledgeDetailView;