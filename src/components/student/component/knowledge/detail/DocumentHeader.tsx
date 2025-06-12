"use client";
import React from 'react';
import Link from 'next/link';
import styles from './DocumentHeader.module.css';
import { KnowledgeBase } from '@/lib/data/knowledgeData';

interface DocumentHeaderProps {
    kb: KnowledgeBase;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({ kb }) => {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <Link href="/student/knowledge" className={styles.backLink} title="返回知识库列表">
                    <i className="fas fa-chevron-left"></i>
                </Link>
                <div className={styles.divider}></div>
                <div className={styles.titleInfo}>
                    <div className={styles.icon}><i className={`fas ${kb.icon}`}></i></div>
                    <div className={styles.titleText}>
                        <h1>
                            {kb.name}
                            <span className={styles.statusTag}><i className="fas fa-check-circle"></i> 构建成功</span>
                        </h1>
                    </div>
                </div>
            </div>
            <div className={styles.rightSection}>
                <button className={styles.menuButton} title="更多操作"><i className="fas fa-ellipsis-h"></i></button>
                <button className={styles.manageButton}>服务管理</button>
            </div>
        </header>
    );
};
export default DocumentHeader;