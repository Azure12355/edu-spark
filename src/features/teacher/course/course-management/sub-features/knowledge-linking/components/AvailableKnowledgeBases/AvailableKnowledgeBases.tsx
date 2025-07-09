// [!file src/features/teacher/course/course-management/sub-features/knowledge-linking/components/AvailableKnowledgeBases/AvailableKnowledgeBases.tsx]
"use client";

import React from 'react';
import styles from './AvailableKnowledgeBases.module.css';
import { KnowledgeBaseVO } from '@/shared/types';
import KnowledgeBaseCard from './KnowledgeBaseCard';

interface AvailableKnowledgeBasesProps {
    availableKBs: KnowledgeBaseVO[];
    onLink: (kbId: number) => void;
    isLoading: boolean;
}

const AvailableKnowledgeBases: React.FC<AvailableKnowledgeBasesProps> = ({
                                                                             availableKBs,
                                                                             onLink,
                                                                             isLoading
                                                                         }) => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>可用的知识库</h2>
            <div className={styles.grid}>
                {isLoading && availableKBs.length === 0 ? (
                    // 骨架屏
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className={styles.skeletonCard}>
                            <div className={styles.skeletonHeader}>
                                <div className={styles.skeletonAvatar}></div>
                                <div className={styles.skeletonLine} style={{width: '80px', height: '14px'}}></div>
                            </div>
                            <div className={styles.skeletonLine} style={{width: '70%', height: '18px'}}></div>
                            <div className={styles.skeletonLine} style={{width: '90%'}}></div>
                        </div>
                    ))
                ) : !isLoading && availableKBs.length === 0 ? (
                    // 空状态
                    <div className={styles.emptyState}>
                        <i className="fas fa-box-open"></i>
                        <p>没有更多可用的知识库了</p>
                        <span>您可以到知识库管理页面创建新的知识库。</span>
                    </div>
                ) : (
                    // 正常渲染列表
                    availableKBs.map(kb => (
                        <KnowledgeBaseCard key={kb.id} kb={kb} onLink={onLink} />
                    ))
                )}
            </div>
        </section>
    );
};

export default AvailableKnowledgeBases;