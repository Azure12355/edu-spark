// src/features/teacher/knowledge/knowledge-detail/sub-features/document-management/components/DocumentTable.tsx
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import { DocumentVO } from '../services/documentService';
import { getFileIcon } from '@/shared/lib/data/documentData';
import styles from '../style/DocumentTable.module.css';

// ===================================================================
//  1. 类型定义
// ===================================================================

interface DocumentTableProps {
    documents: DocumentVO[];
    isLoading: boolean;
    selectedIds: Set<number | string>;
    areAllSelected: boolean;
    onToggleRow: (id: number) => void;
    onToggleAllRows: () => void;
    onPreview?: (doc: DocumentVO) => void;
    onEdit?: (doc: DocumentVO) => void;
    onDelete?: (doc: DocumentVO) => void;
}

// ===================================================================
//  2. 内部子组件
// ===================================================================

const StatusDisplay: React.FC<{ doc: DocumentVO }> = React.memo(({ doc }) => {
    const statusMap = {
        0: { text: '待处理', icon: 'fas fa-clock', className: styles.statusWaiting },
        1: { text: '处理中', icon: 'fas fa-sync-alt fa-spin', className: styles.statusProcessing },
        2: { text: '完毕', icon: 'fas fa-check-circle', className: styles.statusCompleted },
        9: { text: '失败', icon: 'fas fa-exclamation-circle', className: styles.statusError },
    };
    const info = statusMap[doc.status as keyof typeof statusMap] || statusMap[9];

    const content = (
        <span className={`${styles.statusTag} ${info.className}`}>
            <i className={info.icon}></i> {info.text}
        </span>
    );

    // 如果是错误状态，则用 Tooltip 包裹以显示错误信息
    if (doc.status === 9 && doc.errorMessage) {
        return <Tooltip content={doc.errorMessage}>{content}</Tooltip>;
    }

    return content;
});
StatusDisplay.displayName = 'StatusDisplay';

const TableRow: React.FC<{ doc: DocumentVO; isSelected: boolean; onToggleRow: () => void; onPreview?: () => void; onEdit?: () => void; onDelete?: () => void; }> = ({ doc, isSelected, onToggleRow, onPreview, onEdit, onDelete }) => {
    const iconInfo = getFileIcon(doc.type as any);

    return (
        <motion.tr
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            className={isSelected ? styles.selectedRow : ''}
            whileHover={{ backgroundColor: '#f8fafc' }}
        >
            <td className={styles.checkboxCell} onClick={(e) => e.stopPropagation()}>
                <input type="checkbox" checked={isSelected} onChange={onToggleRow} />
            </td>
            <td>
                <div className={styles.fileInfo}>
                    <div className={styles.fileIcon} style={{ color: iconInfo.color }}><i className={`fas ${iconInfo.icon}`}></i></div>
                    <div className={styles.fileText}>
                        <div className={styles.name} title={doc.name}>{doc.name}</div>
                        <div className={styles.id}>ID: {doc.id}</div>
                    </div>
                </div>
            </td>
            <td className={styles.statusCell}>
                <StatusDisplay doc={doc} />
            </td>
            <td style={{ textAlign: 'right' }}>{doc.sliceCount?.toLocaleString() ?? '-'}</td>
            <td>{doc.type}</td>
            <td>{new Date(doc.createdAt).toLocaleString()}</td>
            <td className={styles.actionsCell} onClick={(e) => e.stopPropagation()}>
                <div className={styles.actions}>
                    {onPreview && <Tooltip content="预览"><button onClick={onPreview} className={styles.actionButton}><i className="fas fa-eye"></i></button></Tooltip>}
                    {onEdit && <Tooltip content="编辑"><button onClick={onEdit} className={styles.actionButton}><i className="fas fa-pen"></i></button></Tooltip>}
                    {onDelete && <Tooltip content="删除"><button onClick={onDelete} className={`${styles.actionButton} ${styles.deleteButton}`}><i className="fas fa-trash-alt"></i></button></Tooltip>}
                </div>
            </td>
        </motion.tr>
    );
};

const TableState: React.FC<{ icon: string; message: string; }> = ({ icon, message }) => (
    <div className={styles.stateContainer}>
        <i className={`${icon} ${styles.stateIcon}`}></i>
        <p>{message}</p>
    </div>
);

const SkeletonRow: React.FC = () => (
    <tr><td colSpan={7}><div className={styles.skeletonRow}></div></td></tr>
);

// ===================================================================
//  3. 主表格组件
// ===================================================================
const DocumentTable: React.FC<DocumentTableProps> = ({
                                                         documents,
                                                         isLoading,
                                                         selectedIds,
                                                         areAllSelected,
                                                         onToggleRow,
                                                         onToggleAllRows,
                                                         onPreview,
                                                         onEdit,
                                                         onDelete
                                                     }) => {
    const tableHeader = (
        <thead>
        <tr>
            <th className={styles.checkboxCell}>
                <input
                    type="checkbox"
                    checked={areAllSelected}
                    onChange={onToggleAllRows}
                    disabled={isLoading || documents.length === 0}
                />
            </th>
            <th>文档名称 / ID</th>
            <th style={{ textAlign: 'center' }}>状态</th>
            <th style={{ textAlign: 'right' }}>切片数</th>
            <th>类型</th>
            <th>上传时间</th>
            <th style={{ textAlign: 'right' }}>操作</th>
        </tr>
        </thead>
    );

    const renderTableContent = () => {
        if (isLoading) {
            return Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />);
        }
        return (
            <AnimatePresence>
                {documents.map(doc => (
                    <TableRow
                        key={doc.id}
                        doc={doc}
                        isSelected={selectedIds.has(doc.id)}
                        onToggleRow={() => onToggleRow(doc.id)}
                        onPreview={onPreview ? () => onPreview(doc) : undefined}
                        onEdit={onEdit ? () => onEdit(doc) : undefined}
                        onDelete={onDelete ? () => onDelete(doc) : undefined}
                    />
                ))}
            </AnimatePresence>
        );
    };

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.tableScrollContainer}>
                {!isLoading && documents.length === 0 && (
                    <TableState icon="fas fa-inbox" message="暂无文档，快去上传吧！" />
                )}
                <table className={styles.table}>
                    {tableHeader}
                    <tbody>
                    {renderTableContent()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DocumentTable;