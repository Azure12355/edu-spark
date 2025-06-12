"use client";
import React from 'react';
import styles from './DocumentTable.module.css';
import { Document, getFileIcon, DocumentStatus } from '@/lib/data/documentData';

const statusMap: { [key in DocumentStatus]: { text: string, icon: string, style: string } } = {
    completed: { text: '处理完成', icon: 'fa-check-circle', style: styles.statusCompleted },
    processing: { text: '处理中', icon: 'fa-sync-alt fa-spin', style: styles.statusProcessing },
    error: { text: '处理失败', icon: 'fa-exclamation-circle', style: styles.statusError },
};

const DocumentTable: React.FC<{ documents: Document[] }> = ({ documents }) => {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>文档名称 / ID</th>
                    <th>文档状态</th>
                    <th>切片数</th>
                    <th>导入方式</th>
                    <th>上传时间</th>
                    <th>更新时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {documents.map(doc => {
                    const iconInfo = getFileIcon(doc.type);
                    const statusInfo = statusMap[doc.status];
                    return (
                        <tr key={doc.id}>
                            <td>
                                <div className={styles.fileInfo}>
                                    <div className={styles.fileIcon} style={{backgroundColor: iconInfo.color}}>
                                        <i className={`fas ${iconInfo.icon}`}></i>
                                    </div>
                                    <div className={styles.fileText}>
                                        <div className={styles.name}>{doc.name}</div>
                                        <div className={styles.id}>{doc.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td><span className={`${styles.statusTag} ${statusInfo.style}`}><i className={`fas ${statusInfo.icon}`}></i> {statusInfo.text}</span></td>
                            <td>{doc.chunkCount}</td>
                            <td>{doc.importMethod}</td>
                            <td>{doc.uploadTime}</td>
                            <td>{doc.updateTime}</td>
                            <td>
                                <a href="#" className={styles.actionLink}>切片详情</a>
                                <a href="#" className={styles.actionLink}>删除</a>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};
export default DocumentTable;