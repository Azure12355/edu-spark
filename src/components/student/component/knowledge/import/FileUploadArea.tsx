"use client";
import React, { useRef, useState, DragEvent } from 'react';
import styles from './FileUploadArea.module.css';

interface FileUploadAreaProps {
    onFilesAdded: (files: FileList) => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFilesAdded }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onFilesAdded(e.target.files);
        }
    };

    const handleDragEvents = (e: DragEvent<HTMLDivElement>, dragging: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(dragging);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        handleDragEvents(e, false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFilesAdded(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    return (
        <div className={styles.uploadSection}>
            <p className={styles.label}><span>*</span>上传文档</p>
            <div
                className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
                onClick={() => inputRef.current?.click()}
                onDragEnter={(e) => handleDragEvents(e, true)}
                onDragOver={(e) => handleDragEvents(e, true)}
                onDragLeave={(e) => handleDragEvents(e, false)}
                onDrop={handleDrop}
            >
                <input type="file" ref={inputRef} onChange={handleFileChange} multiple style={{ display: 'none' }} />
                <div className={styles.icon}><i className="fas fa-cloud-upload-alt"></i></div>
                <h3>点击或拖拽文档到此处上传</h3>
                <p className={styles.info}>
                    最多一次上传 100 个文档。<br />
                    文档格式：pdf, doc(.doc/.docx), html: 大小不超过 350 MB;<br />
                    文档格式：ppt(.ppt/.pptx): 大小不超过 200 MB;<br />
                    txt, markdown(.markdown/.md): 大小不超过 10 MB;<br />
                    xlsx, csv, jsonl, faq(.faq.xlsx): 大小不超过 3 万行
                </p>
            </div>
            <p className={styles.formatHelp}>
                如不清楚上传格式，可参照 <a href="#">知识库文档格式说明</a> 或 <a href="#">下载 .faq.xlsx 样例文件</a>
            </p>
        </div>
    );
};
export default FileUploadArea;