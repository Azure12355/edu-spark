"use client";

import React, { useState } from 'react';
import { KnowledgeBaseVO } from '@/services/knowledgeService';

// --- 自定义 Hooks ---
import { useDocumentManagement } from '@/hooks/useDocumentManagement';
import { useChunkManagement } from '@/hooks/useChunkManagement';

// --- 子组件 ---
import KnowledgeDetailLayout from '../layout/KnowledgeDetailLayout';
import Pagination from '@/components/common/Pagination/Pagination';
import KnowledgeBaseInfo from '../tabs/basic-info/KnowledgeBaseInfo';
import DocumentToolbar from '../tabs/documents/DocumentToolbar';
import DocumentTable from '../tabs/documents/DocumentTable';
import ChunkToolbar from "../tabs/chunks/ChunkToolbar";
import ChunkGrid from "../tabs/chunks/ChunkGrid";
import AddChunkModal from "../tabs/chunks/AddChunkModal";

// --- 样式和辅助 ---
import styles from './KnowledgeDetailView.module.css';

interface KnowledgeDetailViewProps {
    kb: KnowledgeBaseVO;
}

// Tab 的配置数据可以保留在此处，因为它与视图逻辑紧密相关
const TABS_CONFIG = [
    { id: 'BasicInfo', label: '基本信息' },
    { id: 'Documents', label: '原始文档' },
    { id: 'Chunks', label: '切片详情' },
    { id: 'RetrievalTest', label: '知识检索' },
    { id: 'QATest', label: '知识问答' },
    { id: 'Statistics', label: '使用统计' },
];

const KnowledgeDetailView: React.FC<KnowledgeDetailViewProps> = ({ kb }) => {
    // --- 状态管理 ---
    const [activeTab, setActiveTab] = useState<string>(TABS_CONFIG[0].label);
    const [isChunkModalOpen, setIsChunkModalOpen] = useState(false);

    // --- 各功能模块的逻辑 Hooks ---
    // 惰性初始化：仅当 Tab 被激活时才考虑调用 Hook 的数据，但这最好在子组件中实现
    const documentManager = useDocumentManagement(kb.id);
    const chunkManager = useChunkManagement(kb.id);

    // --- 渲染不同标签页内容的函数 ---
    const renderTabContent = () => {
        switch(activeTab) {
            case '基本信息':
                return <KnowledgeBaseInfo kb={kb} />;

            case '原始文档':
                return (
                    <div className={styles.tabContentContainer}>
                        <DocumentToolbar
                            selectionCount={documentManager.selectedDocIds.size}
                            onDelete={documentManager.handleDeleteSelected}
                        />
                        <div className={styles.tableContainer}>
                            <DocumentTable
                                documents={documentManager.documents}
                                isLoading={documentManager.isLoading}
                            />
                        </div>
                        {documentManager.pagination.totalItems > 0 && (
                            <Pagination
                                currentPage={documentManager.pagination.currentPage}
                                totalPages={documentManager.pagination.totalPages}
                                onPageChange={documentManager.handlePageChange}
                            />
                        )}
                    </div>
                );

            case '切片详情':
                return (
                    <div className={styles.tabContentContainer}>
                        <ChunkToolbar
                            chunkCount={chunkManager.pagination.totalItems}
                            documents={chunkManager.filters.documents}
                            activeFilterId={chunkManager.filters.sourceFilter}
                            onFilterChange={chunkManager.actions.handleFilterChange}
                            searchTerm={chunkManager.filters.searchTerm}
                            onSearchChange={chunkManager.actions.handleSearchChange}
                            onOpenAddModal={() => setIsChunkModalOpen(true)}
                        />
                        <div className={styles.tableContainer}>
                            <ChunkGrid
                                chunks={chunkManager.chunks}
                                isLoading={chunkManager.isLoading}
                                onDeleteChunk={chunkManager.actions.handleDeleteChunk}
                            />
                        </div>
                        {chunkManager.pagination.totalItems > 0 && (
                            <Pagination
                                currentPage={chunkManager.pagination.currentPage}
                                totalPages={chunkManager.pagination.totalPages}
                                onPageChange={chunkManager.actions.setCurrentPage}
                            />
                        )}
                    </div>
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
        <>
            {/* 【核心修改】: 现在将 tabContent 作为 prop 传递 */}
            <KnowledgeDetailLayout
                kb={kb}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabContent={renderTabContent()}
            />

            {/* Modal 是 Portal，放在布局外部渲染没有影响 */}
            <AddChunkModal
                isOpen={isChunkModalOpen}
                onClose={() => setIsChunkModalOpen(false)}
                onAddChunk={chunkManager.actions.handleAddChunk}
                documents={chunkManager.filters.documents}
            />
        </>
    );
};

export default KnowledgeDetailView;