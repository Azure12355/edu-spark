// src/features/teacher/knowledge/knowledge-detail/sub-features/document-management/components/TableRow/TableRow.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import StatusDisplay from './StatusDisplay';
import { DocumentVO } from '../../services/documentService';
import styles from '../../style/TableRow.module.css';

interface TableRowProps {
    doc: DocumentVO;
    isSelected: boolean;
    onToggleRow: () => void;
    onPreview: (doc: DocumentVO) => void;
    onEdit: (doc: DocumentVO) => void;
    onDelete: (doc: DocumentVO) => void;
}

const TableRow: React.FC<TableRowProps> = React.memo(({ doc, isSelected, onToggleRow, onPreview, onEdit, onDelete }) => {

    return (
        <motion.tr
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className={`${styles.tableRow} ${isSelected ? styles.selected : ''}`}
            whileHover={{ backgroundColor: '#f8fafc' }}
        >
            <td className={`${styles.tableCell} ${styles.checkboxCell}`} onClick={(e) => e.stopPropagation()}>
                <input type="checkbox" checked={isSelected} onChange={onToggleRow} />
            </td>
            <td className={styles.tableCell}>
                <Tooltip content={doc.name}>
                    <div className={styles.fileInfo}>
                        <div className={styles.fileText}>
                            <div className={styles.name}>{doc.name}</div>
                            <div className={styles.id}>ID: {doc.id}</div>
                        </div>
                    </div>
                </Tooltip>
            </td>
            <td className={`${styles.tableCell} ${styles.statusCell}`} style={{ textAlign: 'center' }}>
                <StatusDisplay status={doc.status} errorMessage={doc.errorMessage} />
            </td>
            <td className={styles.tableCell} style={{ textAlign: 'right' }}>
                {doc.sliceCount?.toLocaleString() ?? '-'}
            </td>
            <td className={`${styles.tableCell} ${styles.textCell}`}>
                <Tooltip content={doc.type}>{doc.type}</Tooltip>
            </td>
            <td className={`${styles.tableCell} ${styles.textCell}`}>
                {new Date(doc.createdAt).toLocaleString()}
            </td>
            <td className={`${styles.tableCell} ${styles.actionsCell}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.actions}>
                    <Tooltip content="预览"><button onClick={() => window.open(doc.previewUrl as any, '_blank')} className={styles.actionButton} disabled={!doc.previewUrl}><i className="fas fa-eye"></i></button></Tooltip>
                    <Tooltip content="编辑"><button onClick={() => onEdit(doc)} className={styles.actionButton}><i className="fas fa-pen"></i></button></Tooltip>
                    <Tooltip content="删除"><button onClick={() => onDelete(doc)} className={`${styles.actionButton} ${styles.deleteButton}`}><i className="fas fa-trash-alt"></i></button></Tooltip>
                </div>
            </td>
        </motion.tr>
    );
});

TableRow.displayName = 'DocumentTableRow';

export default TableRow;