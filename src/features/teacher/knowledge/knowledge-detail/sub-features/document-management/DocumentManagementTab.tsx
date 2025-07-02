// src/features/teacher/knowledge/knowledge-detail/sub-features/document-management/DocumentManagementTab.tsx
"use client";

import React, {useState} from 'react';

// --- 逻辑 Hooks ---
import { useDocumentManagement } from './services/useDocumentManagement';
import { useDocumentTable } from './services/useDocumentTable';

// --- UI 组件 ---
import DocumentToolbar, { FilterOption } from './components/DocumentToolbar';
import DocumentTable from './components/DocumentTable';
import Pagination from '@/shared/components/ui/Pagination/Pagination';
import InputModal from '@/shared/components/ui/InputModal/InputModal'; // 引入输入弹窗
import { useToast } from '@/shared/hooks/useToast';
import { updateDocument } from './services/documentService'; // 引入更新 API

// --- 样式 ---
import styles from './style/DocumentManagementTab.module.css';

interface DocumentManagementTabProps {
    kbId: number | string;
}

// 定义筛选和排序选项常量，使代码更清晰
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
    { value: 'status', label: '处理状态' },
];

/**
 * @description “原始文档”标签页的独立领域组件，负责装配该功能的所有部分。
 * @param {DocumentManagementTabProps} props - 包含知识库ID。
 * @returns {React.ReactElement}
 */
const DocumentManagementTab: React.FC<DocumentManagementTabProps> = ({ kbId }) => {
    // --- 逻辑 Hooks ---
    const documentManager = useDocumentManagement(kbId);
    const tableManager = useDocumentTable(documentManager.documents.map(d => d.id));

    // --- UI 状态 ---
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingDoc, setEditingDoc] = useState<{ id: number; name: string } | null>(null);
    const showToast = useToast();

    // --- 事件处理器 ---
    const handleOpenEditModal = (doc: { id: number; name:string; }) => {
        setEditingDoc(doc);
        setIsEditModalOpen(true);
    };

    const handleConfirmEdit = async (newName: string) => {
        if (!editingDoc) return;
        try {
            await updateDocument({ id: editingDoc.id, name: newName });
            showToast({ message: '文档名称更新成功！', type: 'success' });
            documentManager.refresh(); // 刷新列表
        } catch (error) {
            // 错误已由 apiClient 统一处理
            console.error('Failed to update document name:', error);
        }
    };

    return (
        <>
            <div className={styles.tabContentContainer}>
                {/* 1. 工具栏：消费所有筛选、排序、搜索和加载状态 */}
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
                    currentSort={documentManager.sort}
                    onSortChange={documentManager.handleSortChange}
                />

                {/* 2. 表格区域 */}
                <div className={styles.tableContainer}>
                    <DocumentTable
                        documents={documentManager.documents}
                        isLoading={documentManager.isLoading}
                        selectedIds={tableManager.selectedIds}
                        areAllSelected={tableManager.areAllSelected}
                        onToggleRow={tableManager.toggleSelection}
                        onToggleAllRows={tableManager.toggleAllSelection}
                        onEdit={(doc) => handleOpenEditModal({ id: doc.id, name: doc.name })}
                        onDelete={(doc) => documentManager.handleDeleteSelected(new Set([doc.id]))}
                    />
                </div>

                {/* 3. 分页 */}
                {documentManager.pagination.totalItems > 0 && !documentManager.isLoading && (
                    <div className={styles.paginationContainer}>
                        <Pagination {...documentManager.pagination} onPageChange={documentManager.handlePageChange} />
                    </div>
                )}
            </div>

            {/* 4. 编辑弹窗 */}
            <InputModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleConfirmEdit}
                title="修改文档名称"
                label="新名称"
                initialValue={editingDoc?.name || ''}
                validation={(value) => {
                    if (!value.trim()) return "文档名称不能为空。";
                    if (value.length > 255) return "文档名称不能超过255个字符。";
                    return null;
                }}
            />
        </>
    );
};

export default DocumentManagementTab;