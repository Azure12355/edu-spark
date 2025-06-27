"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, DocumentStatus } from '@/types/knowledge';
import { useDocumentTableStore } from '@/store/documentTableStore'; // 1. 从新的 Store 导入
import { getFileIcon } from '@/lib/data/documentData'; // 确保这个路径正确
import styles from './DocumentTable.module.css';

interface DocumentTableProps {
    documents: Document[];
    kbId: string;
}

// 状态图标组件 (保持不变)
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
    // 确保 getFileIcon 接收的是字符串，doc.type 是 string
    const iconInfo = getFileIcon(doc.type as any); // 假设 doc.type 可以安全地转换为 getFileIcon 接受的类型

    return (
        <motion.tr
            layout // 启用布局动画，使高度变化平滑
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
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
                    {/* 请确保 Link 的 href 路径正确，如果需要跳转到详情页 */}
                    {/* <Link href={`/teacher/knowledge/${kbId}/documents/${doc.id}`} passHref> */}
                    <button title="查看切片"><i className="fas fa-th-list"></i></button>
                    {/* </Link> */}
                    <button title="重新处理"><i className="fas fa-redo"></i></button>
                </div>
            </td>
        </motion.tr>
    );
}

// 主表格组件
const DocumentTable: React.FC<DocumentTableProps> = ({ documents, kbId }) => {
    // 2. 从 documentTableStore 获取选择状态和操作
    const {
        selectedDocIds,
        toggleDocumentSelection,
        toggleAllDocumentsSelection,
        clearSelection // 确保导入这个action
    } = useDocumentTableStore();

    // 3. 当 documents prop 变化时，清空之前的选择 (重要，防止跨页/过滤选择残留)
    useEffect(() => {
        clearSelection();
    }, [documents, clearSelection]); // clearSelection 也是依赖项

    const allDocIdsOnPage = documents.map(d => d.id);
    // 4. 判断是否当前页所有文档都被选中
    const areAllSelected = allDocIdsOnPage.length > 0 && allDocIdsOnPage.every(id => selectedDocIds.has(id));

    return (
        <div className={styles.tableWrapper}>
            {/* 这里的 table 元素依然需要保持 block 样式以使 overflow-y: auto 生效 */}
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.checkboxCell}>
                        <input
                            type="checkbox"
                            checked={areAllSelected}
                            // 当点击全选时，传递当前页的所有文档ID和当前是否已经全选的状态
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
                {/* 使用 tbody 来包裹 AnimatePresence，以正确应用动画 */}
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
                            <td colSpan={7}> {/* 确保横跨所有列 */}
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