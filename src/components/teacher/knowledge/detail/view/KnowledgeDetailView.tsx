"use client";

import React, { useState, useEffect } from 'react';
import { KnowledgeBaseVO } from '@/services/knowledgeService';

// --- 自定义 Hooks ---
import { useDocumentManagement } from '@/hooks/useDocumentManagement';
import { useChunkManagement } from '@/hooks/useChunkManagement';
import { useDocumentTable } from '@/hooks/useDocumentTable';

// --- 子组件 ---
import KnowledgeDetailLayout from '../layout/KnowledgeDetailLayout';
import Pagination from '@/components/common/Pagination/Pagination';
import KnowledgeBaseInfo from '../tabs/basic-info/KnowledgeBaseInfo';
import DocumentToolbar from '../tabs/documents/DocumentToolbar';
import DocumentTable from '../tabs/documents/DocumentTable';
import ChunkToolbar from "../tabs/chunks/ChunkToolbar";
import ChunkGrid from "../tabs/chunks/ChunkGrid";
import AddChunkModal from "../tabs/chunks/AddChunkModal";

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
    initialTab?: string;
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
                    <>
                        <div className={styles.tabContentContainer}>
                            <ChunkToolbar
                                chunkCount={chunkManager.pagination.totalItems}
                                documents={documentManager.documents} // 从 documentManager 获取文档列表
                                activeFilterId={chunkManager.filters.sourceFilter}
                                onFilterChange={chunkManager.actions.handleFilterChange}
                                searchTerm={chunkManager.filters.searchTerm}
                                onSearchChange={chunkManager.actions.setSearchTerm}
                                // 假设你已经为 ChunkGrid 添加了 viewMode 的支持
                                viewMode={'grid'} // 临时硬编码
                                onViewModeChange={() => {}} // 临时空函数
                                onOpenAddModal={() => setIsChunkModalOpen(true)}
                                isSearching={chunkManager.isLoading}
                            />
                            <div className={styles.tableContainer}>
                                <ChunkGrid
                                    chunks={chunkManager.chunks}
                                    isLoading={chunkManager.isLoading}
                                    onDeleteChunk={chunkManager.actions.handleDeleteChunk}
                                    viewMode={'grid'} // 临时硬编码
                                    hasActiveFilters={chunkManager.filters.sourceFilter !== 'ALL' || !!chunkManager.filters.searchTerm}
                                />
                            </div>
                            {chunkManager.pagination.totalItems > 0 && (
                                <Pagination {...chunkManager.pagination} onPageChange={chunkManager.actions.setCurrentPage} />
                            )}
                        </div>
                        <AddChunkModal
                            isOpen={isChunkModalOpen}
                            onClose={() => setIsChunkModalOpen(false)}
                            onAddChunk={chunkManager.actions.handleAddChunk}
                            documents={documentManager.documents} // 同样从 documentManager 获取
                        />
                    </>
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