"use client";

import React, {useEffect, useState} from 'react';
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
import {useDocumentTable} from "@/hooks/useDocumentTable";
import {useKnowledgeDetail} from "@/hooks/useKnowledgeDetail";

interface KnowledgeDetailViewProps {
    kb: KnowledgeBaseVO; // kb 依然由父组件传入
    initialTab?: string;
}

// Tab 的配置数据可以保留在此处，因为它与视图逻辑紧密相关
export const TABS_CONFIG = [
    { id: 'BasicInfo', label: '基本信息' },
    { id: 'Documents', label: '原始文档' },
    { id: 'Chunks', label: '切片详情' },
    { id: 'RetrievalTest', label: '知识检索' },
    { id: 'QATest', label: '知识问答' },
    { id: 'Statistics', label: '使用统计' },
];

// 【新】为“原始文档”标签页创建一个独立的组件
const DocumentsTab: React.FC<{ kbId: number | string }> = ({ kbId }) => {
    const documentManager = useDocumentManagement(kbId);
    const docIdsOnCurrentPage = documentManager.documents.map(d => d.id);
    const tableManager = useDocumentTable(docIdsOnCurrentPage);

    useEffect(() => {
        tableManager.clearSelection();
    }, [documentManager.documents, tableManager.clearSelection]);

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
                <Pagination
                    currentPage={documentManager.pagination.currentPage}
                    totalPages={documentManager.pagination.totalPages}
                    onPageChange={documentManager.handlePageChange}
                />
            )}
        </div>
    );
};

// 【新】为“切片详情”标签页创建一个独立的组件
const ChunksTab: React.FC<{ kb: KnowledgeBaseVO }> = ({ kb }) => {
    // 【注意】: 这里的 documents 依赖于 kb 对象，如果 kb 是动态获取的，需要确保它已经存在
    const documentsForChunks = kb.documents || [];
    const chunkManager = useChunkManagement(kb.id, documentsForChunks);
    const [isChunkModalOpen, setIsChunkModalOpen] = useState(false);

    return (
        <>
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
            <AddChunkModal
                isOpen={isChunkModalOpen}
                onClose={() => setIsChunkModalOpen(false)}
                onAddChunk={chunkManager.actions.handleAddChunk}
                documents={chunkManager.filters.documents}
            />
        </>
    );
};


const KnowledgeDetailView: React.FC<KnowledgeDetailViewProps> = ({ kb, initialTab }) => {
    const [activeTab, setActiveTab] = useState<string>(initialTab || TABS_CONFIG[0].label);


    // --- 渲染不同标签页内容的函数 ---
    const renderTabContent = () => {
        switch(activeTab) {
            case '基本信息':
                return <KnowledgeBaseInfo kb={kb} />;
            case '原始文档':
                return <DocumentsTab kbId={kb.id} />;
            case '切片详情':
                // 假设 KnowledgeBaseVO 中包含了 documents 数组
                return <ChunksTab kb={kb} />;
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