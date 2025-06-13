"use client";
import React from 'react';
import Link from 'next/link';
import styles from './CreateAgentHeader.module.css';

const CreateAgentHeader: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                {/* 核心修改：返回按钮链接到 "我的Agent" 页面 */}
                <Link href="/student/my-agents" className={styles.backButton}>
                    <i className="fas fa-arrow-left"></i>
                </Link>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.agentName}>新建课程智能体</h1>
                    <button className={styles.editButton}><i className="fas fa-pencil-alt"></i></button>
                </div>
                <span className={styles.statusBadge}>草稿</span>
                <span className={styles.saveStatus}>已于 17:15:43 自动保存</span>
            </div>
            <div className={styles.centerSection}>
                <button className={`${styles.tabButton} ${styles.active}`}>应用配置</button>
                <button className={styles.tabButton}>发布渠道</button>
            </div>
            <div className={styles.rightSection}>
                <button className={styles.actionButton}><i className="fas fa-expand-arrows-alt"></i></button>
                <button className={styles.actionButton}><i className="fas fa-history"></i> 版本管理</button>
                <button className={`${styles.actionButton} ${styles.publishButton}`}>
                    <i className="fas fa-paper-plane"></i> 发布
                </button>
            </div>
        </header>
    );
};

export default CreateAgentHeader;