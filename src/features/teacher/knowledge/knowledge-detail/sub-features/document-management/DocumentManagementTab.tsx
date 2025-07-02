// src/features/teacher/knowledge/knowledge-detail/sub-features/document-management/DocumentManagementTab.tsx
"use client";

import React, { useEffect } from 'react';

// [!code focus start]
// --- 逻辑 Hooks (更新导入路径) ---
import { useDocumentManagement } from './services/useDocumentManagement';
import { useDocumentTable } from './services/useDocumentTable';
// [!code focus end]

// --- UI 组件 ---
import DocumentToolbar from './components/DocumentToolbar';
import DocumentTable from './components/DocumentTable';
import Pagination from '@/shared/components/ui/Pagination/Pagination';

// --- 样式 ---
import styles from './style/DocumentManagementTab.module.css';

interface DocumentManagementTabProps {
    kbId: number | string;
}

/**
 * @description “原始文档”标签页的独立领域组件，负责装配该功能的所有部分。
 * @param {DocumentManagementTabProps} props - 包含知识库ID。
 * @returns {React.ReactElement}
 */
const DocumentManagementTab: React.FC<DocumentManagementTabProps> = ({ kbId }) => {
    // --- 状态与逻辑 Hooks ---
    // 数据管理逻辑
    const documentManager = useDocumentManagement(kbId);
    // 表格 UI 交互逻辑
    const tableManager = useDocumentTable(documentManager.documents.map(d => d.id));

    // 副作用：当文档数据更新时，清空表格的选择状态
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
            {/* 仅在有数据时显示分页 */}
            {documentManager.pagination.totalItems > 0 && !documentManager.isLoading && (
                <div className={styles.paginationContainer}>
                    <Pagination {...documentManager.pagination} onPageChange={documentManager.handlePageChange} />
                </div>
            )}
        </div>
    );
};

export default DocumentManagementTab;