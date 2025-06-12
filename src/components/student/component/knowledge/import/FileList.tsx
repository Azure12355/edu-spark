"use client";
import React from 'react';
import Image from 'next/image';
import styles from './FileList.module.css';
import { getFileIcon } from '@/lib/data/documentData'; // 复用之前的函数

interface FileListProps {
    files: File[];
    onDelete: (fileName: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDelete }) => {
    if (files.length === 0) return null;

    return (
        <div className={styles.fileListContainer}>
            <div className={styles.header}>文档 ({files.length}/100)</div>
            <div className={styles.list}>
                {files.map((file, index) => {
                    const extension = file.name.split('.').pop()?.toLowerCase() || 'txt';
                    const { icon, color } = getFileIcon(extension as any);
                    return (
                        <div key={index} className={styles.item}>
                            <div className={styles.fileIcon} style={{ fontSize: '20px', color: color }}>
                                <i className={`fas ${icon}`}></i>
                            </div>
                            <span className={styles.fileName}>{file.name}</span>
                            <div className={styles.actions}>
                                <i className="fas fa-check-circle"></i>
                                <button onClick={() => onDelete(file.name)}><i className="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default FileList;