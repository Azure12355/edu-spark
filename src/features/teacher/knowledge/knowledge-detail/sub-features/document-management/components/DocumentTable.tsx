// src/features/teacher/knowledge/knowledge-detail/sub-features/document-management/components/DocumentTable.tsx
"use client";

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { DocumentVO } from '../services/documentService';
import TableRow from './document-table/TableRow'; // Import the new TableRow component
import styles from '../style/DocumentTable.module.css';

// Type definitions remain the same
interface DocumentTableProps {
    documents: DocumentVO[];
    isLoading: boolean;
    selectedIds: Set<number>;
    areAllSelected: boolean;
    onToggleRow: (id: number) => void;
    onToggleAllRows: () => void;
    onPreview: (doc: DocumentVO) => void;
    onEdit: (doc: DocumentVO) => void;
    onDelete: (doc: DocumentVO) => void;
}

// Reusable state display components
const TableState: React.FC<{ icon: string; message: string; }> = ({ icon, message }) => (
    <div className={styles.stateContainer}>
        <i className={`${icon} ${styles.stateIcon}`}></i>
        <p>{message}</p>
    </div>
);

const SkeletonRows: React.FC<{ count?: number }> = ({ count = 8 }) => (
    <tbody>
    {Array.from({ length: count }).map((_, i) => (
        <tr key={i}>
            <td colSpan={7} style={{ padding: '4px 0' }}>
                <div className={styles.skeletonRow}></div>
            </td>
        </tr>
    ))}
    </tbody>
);

// Main Table Component
const DocumentTable: React.FC<DocumentTableProps> = ({
                                                         documents,
                                                         isLoading,
                                                         selectedIds,
                                                         areAllSelected,
                                                         onToggleRow,
                                                         onToggleAllRows,
                                                         onPreview,
                                                         onEdit,
                                                         onDelete,
                                                     }) => {
    return (
        <div className={styles.tableWrapper}>
            <div className={styles.tableScrollContainer}>
                {isLoading && documents.length === 0 && <TableState icon="fas fa-spinner fa-spin" message="加载中..." />}
                {!isLoading && documents.length === 0 && <TableState icon="fas fa-inbox" message="暂无文档，快去上传吧！" />}

                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.checkboxCell}>
                            <input
                                type="checkbox"
                                checked={areAllSelected && !isLoading}
                                onChange={onToggleAllRows}
                                disabled={isLoading || documents.length === 0}
                            />
                        </th>
                        <th>文档名称 / ID</th>
                        <th style={{ textAlign: 'center' }}>状态</th>
                        <th style={{ textAlign: 'right' }}>切片数</th>
                        <th>类型</th>
                        <th>上传时间</th>
                        <th style={{ textAlign: 'right', paddingRight: '24px' }}>操作</th>
                    </tr>
                    </thead>
                    {isLoading && documents.length === 0 ? <SkeletonRows /> : (
                        <tbody>
                        <AnimatePresence>
                            {documents.map(doc => (
                                <TableRow
                                    key={doc.id}
                                    doc={doc}
                                    isSelected={selectedIds.has(doc.id)}
                                    onToggleRow={() => onToggleRow(doc.id)}
                                    onPreview={onPreview}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </AnimatePresence>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default DocumentTable;