// [!file src/features/teacher/shared-resources/components/ResourceGrid/ResourceGrid.tsx]
"use client";

import React from 'react';
import styles from './ResourceGrid.module.css';
import { UnifiedResource } from '../../hooks/useSharedResources';
import ResourceCard from './ResourceCard';

interface ResourceGridProps {
    resources: UnifiedResource[];
    isLoading: boolean;
}

const ResourceGrid: React.FC<ResourceGridProps> = ({ resources, isLoading }) => {
    // 骨架屏组件，用于初始加载
    const SkeletonGrid = () => (
        <>
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className={styles.card_skeleton}>
                    <div className={styles.card_header_skeleton}>
                        <div className={styles.card_line_skeleton} style={{ width: '60%', height: '20px' }}></div>
                    </div>
                    <div className={styles.card_body_skeleton}>
                        <div className={styles.card_line_skeleton} style={{ width: '90%' }}></div>
                        <div className={styles.card_line_skeleton} style={{ width: '70%' }}></div>
                    </div>
                    <div className={styles.card_footer_skeleton}>
                        <div className={styles.card_avatar_skeleton}></div>
                        <div className={styles.card_line_skeleton} style={{ width: '80px', height: '14px' }}></div>
                    </div>
                </div>
            ))}
        </>
    );

    const EmptyState = () => (
        <div className={styles.emptyState}>
            <i className="fas fa-search-minus"></i>
            <p>没有找到匹配的共享资源</p>
            <span>尝试更换筛选条件或搜索关键词。</span>
        </div>
    );


    return (
        <div className={styles.gridContainer}>
            {isLoading && resources.length === 0 ? <SkeletonGrid /> :
                !isLoading && resources.length === 0 ? <EmptyState /> :
                    resources.map(resource => (
                        <ResourceCard key={`${resource.type}-${resource.id}`} resource={resource} />
                    ))}
        </div>
    );
};

export default ResourceGrid;