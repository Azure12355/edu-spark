// [!file src/features/teacher/course/course-management/sub-features/question-bank/components/SyllabusNavigator/SyllabusNavigator.tsx]
"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './SyllabusNavigator.module.css';

// 1. 导入新的 Hook 和 Store
import { useSyllabusNavigator } from '../../hooks/useSyllabusNavigator';

interface SyllabusNavigatorProps {
    selectedPointId: string | null | number;
    onSelectPoint: (pointId: number) => void;
}

// 骨架屏组件
const NavigatorSkeleton = () => (
    <div className={styles.skeletonContainer}>
        {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.chapterSkeleton}>
                <div className={styles.lineSkeleton}></div>
                <div className={`${styles.lineSkeleton} ${styles.short}`}></div>
            </div>
        ))}
    </div>
);


const SyllabusNavigator: React.FC<SyllabusNavigatorProps> = ({ selectedPointId, onSelectPoint }) => {
    // 3. 调用新的 Hook 获取大纲数据和状态
    const { syllabus, isLoading, error, expandedItems, handleToggleItem } = useSyllabusNavigator();

    // 根据传入的 props 定制化渲染 PointNode
    const CustomPointNode = ({ point }: { point: any }) => (
        <div
            className={`${styles.pointItem} ${selectedPointId === point.id ? styles.active : ''}`}
            onClick={() => onSelectPoint(point.id)}
        >
            <span className={styles.pointText}>{point.title}</span>
        </div>
    );

    return (
        <div className={styles.navigatorContainer}>
            <header className={styles.header}>
                <i className={`fas fa-sitemap ${styles.headerIcon}`}></i>
                <h2 className={styles.headerTitle}>知识点导航</h2>
            </header>

            <div className={styles.treeView}>
                {isLoading && <NavigatorSkeleton />}
                {error && <div className={styles.errorState}>{error}</div>}
                {!isLoading && !error && syllabus?.chapters.map((chapter: any) => (
                    // 这里可以继续使用 ChapterNode 和 SectionNode，但需要给它们传递定制化的 PointNode
                    // 为了简化，我们直接在这里渲染三级结构
                    <div key={chapter.id} className={styles.chapterNode}>
                        <div className={styles.chapterTitle} onClick={() => handleToggleItem(chapter.id)}>
                            <i className={`${styles.chapterIcon} fas fa-book-open`}></i>
                            <span className={styles.chapterText}>{chapter.title}</span>
                            <i className={`fas fa-chevron-down ${styles.chevron} ${expandedItems.has(chapter.id) ? styles.expanded : ''}`}></i>
                        </div>
                        {expandedItems.has(chapter.id) && (
                            <ul className={styles.sectionList}>
                                {chapter.sections.map((section: any) => (
                                    <li key={section.id}>
                                        <h4 className={styles.sectionTitle}>{section.title}</h4>
                                        <ul className={styles.pointList}>
                                            {section.points.map((point: any) => (
                                                <li key={point.id}>
                                                    <CustomPointNode point={point} />
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SyllabusNavigator;