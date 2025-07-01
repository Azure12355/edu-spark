// src/components/teacher/course-management/point-edit/PointEditHeader/PointEditHeader.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import styles from './PointEditHeader.module.css';

interface PointEditHeaderProps {
    title: string;
    backUrl: string;
    onSave: () => void;
    onMetadataClick: () => void;
}

const PointEditHeader: React.FC<PointEditHeaderProps> = ({ title, backUrl, onSave, onMetadataClick }) => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <Link href={backUrl} className={styles.backButton}><i className="fas fa-arrow-left"></i></Link>
                <h1 className={styles.title}>{title}</h1>
            </div>
            <div className={styles.right}>
                <button onClick={onMetadataClick} className={styles.metaButton}>编辑元信息</button>
                <button onClick={onSave} className={styles.saveButton}>保存并发布</button>
            </div>
        </header>
    );
};
export default PointEditHeader;