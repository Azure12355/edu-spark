"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './ImportHeader.module.css';

const ImportHeader = () => {
    const params = useParams();
    const kbId = params.id;
    return (
        <div className={styles.header}>
            <Link href={`/teacher/knowledge/${kbId}`} className={styles.backLink}>
                <i className="fas fa-chevron-left"></i>
            </Link>
            <h1 className={styles.title}>导入文档</h1>
        </div>
    );
};
export default ImportHeader;