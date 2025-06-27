"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, DocumentStatus } from '@/types/knowledge';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { getFileIcon } from '@/lib/data/documentData';
import styles from './DocumentTable.module.css';
import {useDocumentTableStore} from "@/store/documentTableStore";

interface DocumentTableProps {
    documents: Document[];
    kbId: string;
}

// 状态图标组件
const StatusDisplay: React.FC<{ status: DocumentStatus }> = ({ status }) => {
    const statusMap = {
        COMPLETED: { text: '处理完成', icon: 'fas fa-check-circle', className: styles.statusCompleted },
        PROCESSING: { text: '处理中', icon: 'fas fa-sync-alt fa-spin', className: styles.statusProcessing },
        FAILED: { text: '处理失败', icon: 'fas fa-exclamation-circle', className: styles.statusError },
    };
    const info = statusMap[status];
    return <span className={`${styles.statusTag} ${info.className}`}><i className={info.icon}></i> {info.text}</span>;
};

// 表格行组件
const TableRow: React.FC<{ doc: Document; isSelected: boolean; onToggle: () => void }> = ({ doc, isSelected, onToggle }) => {
    const iconInfo = getFileIcon(doc.type as any);

    return (
        <motion.tr
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={isSelected ? styles.selectedRow : ''}
        >
            <td className={styles.checkboxCell}>
                <input type="checkbox" checked={isSelected} onChange={onToggle} />
            </td>
            <td>
                <div className={styles.fileInfo}>
                    <div className={styles.fileIcon} style={{ color: iconInfo.color }}>
                        <i className={`fas ${iconInfo.icon}`}></i>
                    </div>
                    <div className={styles.fileText}>
                        <div className={styles.name}>{doc.name}</div>
                        <div className={styles.id}>ID: {doc.coze_document_id}</div>
                    </div>
                </div>
            </td>
            <td><StatusDisplay status={doc.status} /></td>
            <td>{doc.slice_count.toLocaleString()}</td>
            <td>{doc.source_type === 0 ? '本地上传' : '网页链接'}</td>
            <td>{new Date(doc.created_at).toLocaleString()}</td>
            <td className={styles.actionsCell}>
                <div className={styles.actions}>
                    <button title="查看切片"><i className="fas fa-th-list"></i></button>
                    <button title="重新处理"><i className="fas fa-redo"></i></button>
                </div>
            </td>
        </motion.tr>
    );
}

const DocumentTable: React.FC<DocumentTableProps> = ({ documents, kbId }) => {
    // CORE FIX: Use the new, dedicated store for selection state
    const {
        selectedDocIds,
        toggleDocumentSelection,
        toggleAllDocumentsSelection,
        clearSelection
    } = useDocumentTableStore();

    useEffect(() => {
        clearSelection();
    }, [documents, clearSelection]);

    const allDocIdsOnPage = documents.map(d => d.id);
    const areAllSelected = allDocIdsOnPage.length > 0 && allDocIdsOnPage.every(id => selectedDocIds.has(id));

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.checkboxCell}>
                        <input
                            type="checkbox"
                            checked={areAllSelected}
                            onChange={() => toggleAllDocumentsSelection(allDocIdsOnPage, areAllSelected)}
                        />
                    </th>
                    <th>文档名称 / ID</th>
                    <th>文档状态</th>
                    <th>切片数</th>
                    <th>导入方式</th>
                    <th>上传时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <AnimatePresence>
                    {documents.length > 0 ? (
                        documents.map(doc => (
                            <TableRow
                                key={doc.id}
                                doc={doc}
                                isSelected={selectedDocIds.has(doc.id)}
                                onToggle={() => toggleDocumentSelection(doc.id)}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>
                                <div className={styles.emptyState}>
                                    <i className={`fas fa-file-excel ${styles.emptyIcon}`}></i>
                                    <p>知识库中还没有文档</p>
                                    <span>点击右上角的“导入文档”按钮开始添加吧！</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </AnimatePresence>
                </tbody>
            </table>
        </div>
    );
};
export default DocumentTable;