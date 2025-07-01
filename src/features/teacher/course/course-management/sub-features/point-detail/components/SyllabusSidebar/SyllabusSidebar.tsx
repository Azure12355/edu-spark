// src/components/teacher/course-management/point-detail/SyllabusSidebar/SyllabusSidebar.tsx
"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { syllabusData } from '@/shared/lib/data/syllabusData';
import styles from './SyllabusSidebar.module.css';

const SyllabusSidebar: React.FC = () => {
    const params = useParams();
    const courseId = params.id;
    const activePointId = params.pointId;

    // 1. 状态：控制侧边栏是否折叠（现在叫 isVisible 更贴切）
    const [isVisible, setIsVisible] = useState(true);

    const defaultExpanded = useMemo(() => {
        const activeIds = new Set<string>();
        for (const chapter of syllabusData) {
            for (const section of chapter.sections) {
                if (section.points.some(p => p.id === activePointId)) {
                    activeIds.add(chapter.id);
                    activeIds.add(section.id);
                    break;
                }
            }
        }
        return activeIds;
    }, [activePointId]);

    const [expandedItems, setExpandedItems] = useState<Set<string>>(defaultExpanded);

    const toggleItem = (id: string) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };

    return (
        // 2. 使用一个外层容器来容纳侧边栏和悬浮按钮
        <div className={styles.sidebarWrapper}>
            <AnimatePresence>
                {isVisible && (
                    <motion.aside
                        className={styles.sidebar}
                    >
                        <div className={styles.sidebarInner}>
                            <div className={styles.sidebarHeader}>
                                <div className={styles.searchBar}>
                                    <i className="fas fa-search"></i>
                                    <input type="text" placeholder="搜索题目" />
                                </div>
                            </div>

                            <nav className={styles.sidebarContent}>
                                {/* ... (导航树的 JSX 保持不变) ... */}
                                {syllabusData.map(chapter => (
                                    <div key={chapter.id} className={styles.chapter}>
                                        <div className={styles.chapterTitle} onClick={() => toggleItem(chapter.id)}>
                                            <span>{chapter.title}</span>
                                            <i className={`fas fa-chevron-right ${styles.chevron} ${expandedItems.has(chapter.id) ? styles.expanded : ''}`}></i>
                                        </div>
                                        <AnimatePresence>
                                            {expandedItems.has(chapter.id) && (
                                                <motion.div
                                                    initial="collapsed" animate="open" exit="collapsed"
                                                    variants={{ open: { opacity: 1, height: 'auto' }, collapsed: { opacity: 0, height: 0 } }}
                                                    className={styles.sectionList}
                                                >
                                                    {chapter.sections.map(section => (
                                                        <div key={section.id} className={styles.section}>
                                                            <div className={styles.sectionTitle} onClick={() => toggleItem(section.id)}>
                                                                <span>{section.title}</span>
                                                            </div>
                                                            <div className={styles.pointList}>
                                                                {section.points.map(point => (
                                                                    <Link key={point.id} href={`/teacher/courses/${courseId}/syllabus/${point.id}`}
                                                                          className={`${styles.pointLink} ${activePointId === point.id ? styles.active : ''}`}>
                                                                        {point.title}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </nav>

                            {/* 3. 新增底部返回按钮 */}
                            <div className={styles.sidebarFooter}>
                                <Link href={`/teacher/courses/${courseId}/syllabus`} className={styles.backButton}>
                                    <i className="fas fa-arrow-left"></i> 返回大纲总览
                                </Link>
                            </div>
                        </div>

                        {/* 4. 将折叠按钮放在侧边栏内部，以便一起消失 */}
                        <button className={styles.toggleButton} onClick={() => setIsVisible(false)} title="收起大纲">
                            <i className="fas fa-angle-double-left"></i>
                        </button>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* 5. 新增的悬浮展开按钮，仅在侧边栏不可见时显示 */}
            <AnimatePresence>
                {!isVisible && (
                    <motion.button
                        className={`${styles.toggleButton} ${styles.floatingToggleButton}`}
                        onClick={() => setIsVisible(true)}
                        title="展开大纲"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <i className="fas fa-angle-double-right"></i>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SyllabusSidebar;