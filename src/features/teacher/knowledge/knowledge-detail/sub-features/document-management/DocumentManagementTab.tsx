// src/features/teacher/knowledge/knowledge-detail/sub-features/document-management/DocumentManagementTab.tsx
"use client";

import React, { useEffect } from 'react';

// --- 逻辑 Hooks ---
// [!code --]
// import { useDocumentManagement } from './services/useDocumentManagement';
import { useDocumentTable } from './services/useDocumentTable';
import type { useDocumentManagement } from './services/useDocumentManagement'; // [!code ++] 导入 useDocumentManagement 的返回类型

// --- UI 组件 ---
import DocumentToolbar, {FilterOption} from './components/DocumentToolbar';
import DocumentTable from './components/DocumentTable';
import Pagination from '@/shared/components/ui/Pagination/Pagination';

// --- 样式 ---
import styles from './style/DocumentManagementTab.module.css';

interface DocumentManagementTabProps {
    kbId: number | string; // kbId 仍然需要，可能用于其他目的
    // [!code focus start]≈
    // 接收完整的 documentManager 对象
    documentManager: ReturnType<typeof useDocumentManagement>;
}

const STATUS_OPTIONS: FilterOption<number | 'ALL'>[] = [
    { value: 'ALL', label: '所有状态' },
    { value: 0, label: '待处理' },
    { value: 1, label: '处理中' },
    { value: 2, label: '完毕' },
    { value: 9, label: '失败' },
];

const SORT_OPTIONS: FilterOption<string>[] = [
    { value: 'created_at', label: '上传时间' },
    { value: 'name', label: '文档名称' },
    { value: 'size', label: '文件大小' },
];

const DocumentManagementTab: React.FC<DocumentManagementTabProps> = ({ kbId, documentManager }) => {

    // tableManager 依赖于 documentManager 的结果，所以逻辑保持不变
    const tableManager = useDocumentTable(documentManager.documents.map(d => d.id));

    useEffect(() => {
        tableManager.clearSelection();
    }, [documentManager.documents, tableManager.clearSelection]);

    return (
        <div className={styles.tabContentContainer}>
            <DocumentToolbar
                selectionCount={tableManager.selectedIds.size}
                onDeleteSelected={() => documentManager.handleDeleteSelected(tableManager.selectedIds)}
                isDeleting={documentManager.isDeleting}
                isSearching={documentManager.isLoading}
                statusOptions={STATUS_OPTIONS}
                currentStatus={documentManager.statusFilter}
                onStatusChange={documentManager.handleStatusChange}
                searchTerm={documentManager.searchTerm}
                onSearchTermChange={documentManager.handleSearchTermChange}
                sortOptions={SORT_OPTIONS}
                currentSort={documentManager.sort.split(':')[0]} // 只传递字段名
                onSortChange={documentManager.handleSortChange}
            />
            <div className={styles.tableContainer}>
                <DocumentTable
                    documents={documentManager.documents}
                    isLoading={documentManager.isLoading}
                    selectedIds={tableManager.selectedIds}
                    areAllSelected={tableManager.areAllSelected}
                    onToggleRow={tableManager.toggleSelection}
                    onToggleAllRows={tableManager.toggleAllSelection}
                    onEdit={(doc) => { /* TODO: 实现编辑逻辑 */ }}
                    onDelete={(doc) => documentManager.handleDeleteSelected(new Set([doc.id]))}
                    onPreview={(doc) => { /* TODO: 实现预览逻辑 */ }}
                />
            </div>
            {documentManager.pagination.totalItems > 0 && !documentManager.isLoading && (
                <div className={styles.paginationContainer}>
                    <Pagination {...documentManager.pagination} onPageChange={documentManager.handlePageChange} />
                </div>
            )}
        </div>
    );
};

export default DocumentManagementTab;