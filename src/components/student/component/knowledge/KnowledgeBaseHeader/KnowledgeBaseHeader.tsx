"use client";
import React from 'react';
import styles from './KnowledgeBaseHeader.module.css';

const KnowledgeBaseHeader = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.titleSection}>
                <h2>知识库</h2>
                <p>知识库提供知识管理的能力，将本地存储、TOS 中存储或指定链接的多个文档导入到知识库中，并对文档执行解析、切片、向量化、构建索引等处理流程，处理完成后即可进行知识检索。</p>
            </div>
            <div className={styles.actionsSection}>
                <button className={styles.actionButton}>
                    账单与退订 <i className="fas fa-chevron-down"></i>
                </button>
                <button className={styles.actionButton}>
                    <i className="fas fa-lightbulb"></i> 使用说明
                </button>
            </div>
        </div>
    );
};
export default KnowledgeBaseHeader;