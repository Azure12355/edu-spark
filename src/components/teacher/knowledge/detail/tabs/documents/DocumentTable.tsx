"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentVO } from '@/services/documentService';
import { useDocumentTableStore } from '@/store/documentTableStore';
import { getFileIcon } from '@/lib/data/documentData';
import styles from './DocumentTable.module.css';

interface DocumentTableProps {
    documents: DocumentVO[];
    isLoading: boolean;
}

const StatusDisplay: React.FC<{ status: number }> = ({ status }) => {
    // 映射状态码到显示信息
    const statusMap = {
        0: { text: '待处理', icon: 'fas fa-clock', className: styles.statusWaiting },
        1: { text: '处理中', icon: 'fas fa-sync-alt fa-spin', className: styles.statusProcessing },
        2: { text: '完毕', icon: 'fas fa-check-circle', className: styles.statusCompleted },
        9: { text: '失败', icon: 'fas fa-exclamation-circle', className: styles.statusError },
    };
    const info = statusMap[status as keyof typeof statusMap] || statusMap[9];
    return <span className={`${styles.statusTag} ${info.className}`}><i className={info.icon}></i> {info.text}</span>;
};

const TableRow: React.FC<{ doc: DocumentVO, isSelected: boolean, onToggle: () => void }> = ({ doc, isSelected, onToggle }) => {
    const iconInfo = getFileIcon(doc.type as any);

    return (
        <motion.tr layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -50 }} className={isSelected ? styles.selectedRow : ''}>
            <td className={styles.checkboxCell}>
                <input type="checkbox" checked={isSelected} onChange={onToggle} />
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
            <td><StatusDisplay status={doc.status} /></td>
            <td>{doc.sliceCount?.toLocaleString() ?? '-'}</td>
            <td>{doc.cosUrl ? 'COS上传' : '未知'}</td>
            <td>{new Date(doc.createdAt).toLocaleString()}</td>
            <td className={styles.actionsCell}>
                <div className={styles.actions}>
                    <button title="查看切片"><i className="fas fa-th-list"></i></button>
                    <button title="重新处理"><i className="fas fa-redo"></i></button>
                </div>
            </td>
        </motion.tr>
    );
};

const SkeletonRow = () => (
    <tr>
        <td colSpan={7}><div className={styles.skeletonRow}></div></td>
    </tr>
);

const DocumentTable: React.FC<DocumentTableProps> = ({ documents, isLoading }) => {
    const { selectedDocIds, toggleDocumentSelection, toggleAllDocumentsSelection, clearSelection } = useDocumentTableStore();

    useEffect(() => {
        return () => { clearSelection(); }; // 组件卸载时清空选择
    }, [clearSelection]);

    const allDocIdsOnPage = documents.map(d => String(d.id));
    const areAllSelected = allDocIdsOnPage.length > 0 && allDocIdsOnPage.every(id => selectedDocIds.has(id));

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead style={{ zIndex: 1 }}> {/* 确保表头在滚动时位于上层 */}
                <tr>
                    <th className={styles.checkboxCell}>
                        <input type="checkbox" checked={areAllSelected} onChange={() => toggleAllDocumentsSelection(allDocIdsOnPage, areAllSelected)} />
                    </th>
                    <th>文档名称 / ID</th><th>状态</th><th>切片数</th><th>来源</th><th>上传时间</th><th>操作</th>
                </tr>
                </thead>
                <tbody>
                <AnimatePresence>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                    ) : documents.length > 0 ? (
                        documents.map(doc => (
                            <TableRow key={doc.id} doc={doc} isSelected={selectedDocIds.has(String(doc.id))} onToggle={() => toggleDocumentSelection(String(doc.id))} />
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