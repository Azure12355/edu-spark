"use client";
import React from 'react';
import styles from './FileList.module.css';
import { getFileIcon } from '@/lib/data/documentData';

// 1. 更新 Props 接口
interface UploadableFile {
    file: File;
    id: string;
    status: 'waiting' | 'uploading' | 'success' | 'failed';
    progress: number;
    error?: string;
}

interface FileListProps {
    files: UploadableFile[];
    onDelete: (fileId: string) => void;
}

// 2. 状态显示组件
const StatusDisplay: React.FC<{ file: UploadableFile }> = ({ file }) => {
    switch (file.status) {
        case 'uploading':
            return <div className={styles.progressBar}><div style={{ width: `${file.progress}%` }} /></div>;
        case 'success':
            return <span className={styles.statusSuccess}><i className="fas fa-check-circle"></i> 成功</span>;
        case 'failed':
            return <span className={styles.statusFailed} title={file.error}><i className="fas fa-times-circle"></i> 失败</span>;
        case 'waiting':
        default:
            return <span className={styles.statusWaiting}>等待上传</span>;
    }
}

const FileList: React.FC<FileListProps> = ({ files, onDelete }) => {
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
                                <button onClick={() => onDelete(uploadableFile.id)} disabled={uploadableFile.status === 'uploading'}><i className="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default FileList;