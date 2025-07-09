// [!file src/features/teacher/course/course-management/sub-features/knowledge-linking/components/LinkedKnowledgeBases/LinkedKnowledgeBases.tsx]
"use client";

import React from 'react';
import styles from './LinkedKnowledgeBases.module.css';
import { KnowledgeBase } from '@/shared/types';
import LinkedCard from './LinkedCard';

interface LinkedKnowledgeBasesProps {
    linkedKBs: KnowledgeBase[];
    onUnlink: (kbId: number) => void;
    isLoading: boolean;
}

const LinkedKnowledgeBases: React.FC<LinkedKnowledgeBasesProps> = ({
                                                                       linkedKBs,
                                                                       onUnlink,
                                                                       isLoading
                                                                   }) => {
    return (
        <aside className={styles.container}>
            <h2 className={styles.title}>
                已关联的知识库
                <span className={styles.countBadge}>{linkedKBs.length}</span>
            </h2>

            <div className={styles.list}>
                {isLoading && linkedKBs.length === 0 ? (
                    // 初始加载状态
                    Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className={styles.skeletonCard}>
                            <div className={styles.skeletonIcon}></div>
                            <div className={styles.skeletonInfo}>
                                <div className={styles.skeletonLine} style={{width: '70%'}}></div>
                                <div className={styles.skeletonLine} style={{width: '90%'}}></div>
                            </div>
                        </div>
                    ))
                ) : linkedKBs.length === 0 ? (
                    // 空状态
                    <div className={styles.emptyState}>
                        <i className="fas fa-link-slash"></i>
                        <p>暂未关联任何知识库</p>
                        <span>请从右侧列表选择添加</span>
                    </div>
                ) : (
                    // 正常渲染列表
                    linkedKBs.map(kb => (
                        <LinkedCard key={kb.id} kb={kb} onUnlink={onUnlink} />
                    ))
                )}
            </div>
        </aside>
    );
};

export default LinkedKnowledgeBases;