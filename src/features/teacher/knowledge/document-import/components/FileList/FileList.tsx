"use client";
import React from 'react';
import styles from './FileList.module.css';
import { getFileIcon } from '@/shared/lib/data/documentData';
import { UploadableFile, UploadStatus } from '@/shared/hooks/useFileUpload'; // 从Hook导入类型

interface FileListProps {
    files: UploadableFile[];
    onDelete: (fileId: string) => void;
}

// 状态显示子组件，增加 processing 状态
const StatusDisplay: React.FC<{ file: UploadableFile }> = ({ file }) => {
    switch (file.status) {
        case 'uploading':
            return (
                <div className={styles.progressBarWrapper}>
                    <span>上传中...</span>
                    <div className={styles.progressBar}><div style={{ width: `${file.progress}%` }} /></div>
                </div>
            );
        case 'processing': // 新增状态
            return <span className={styles.statusProcessing}><i className="fas fa-spinner fa-spin"></i> 处理中</span>;
        case 'success':
            return <span className={styles.statusSuccess}><i className="fas fa-check-circle"></i> 成功</span>;
        case 'failed':
            return <span className={styles.statusFailed} title={file.error}><i className="fas fa-times-circle"></i> 失败</span>;
        case 'waiting':
        default:
            return <span className={styles.statusWaiting}>等待上传</span>;
    }
}

// 主组件保持不变
const FileList: React.FC<FileListProps> = ({ files, onDelete }) => {
    // ... (内部 JSX 结构完全不需要修改)
    if (files.length === 0) return null;

    return (
        <div className={styles.fileListContainer}>
            <div className={styles.header}>待上传文档 ({files.length}/100)</div>
            <div className={styles.list}>
                {files.map(uploadableFile => {
                    const { file } = uploadableFile;
                    const extension = file.name.split('.').pop()?.toLowerCase() || 'txt';
                    const { icon, color } = getFileIcon(extension as any);
                    return (
                        <div key={uploadableFile.id} className={styles.item}>
                            <div className={styles.fileIcon} style={{ fontSize: '24px', color: color }}>
                                <i className={`fas ${icon}`}></i>
                            </div>
                            <span className={styles.fileName}>{file.name}</span>
                            <div className={styles.actions}>
                                <StatusDisplay file={uploadableFile} />
                                <button onClick={() => onDelete(uploadableFile.id)} disabled={uploadableFile.status === 'uploading' || uploadableFile.status === 'processing'}><i className="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default FileList;