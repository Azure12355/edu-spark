// [!file src/features/teacher/course/course-management/sub-features/point-detail/components/SyllabusSidebar/SyllabusSidebar.tsx]
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SyllabusVO } from '../../types';
import styles from './SyllabusSidebar.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import ChapterNode from './ChapterNode';

interface SyllabusSidebarProps {
    syllabus: SyllabusVO | null;
    isLoading: boolean;
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

const SidebarSkeleton: React.FC = () => (
    <div className={styles.sidebarInner}>
        <div className={styles.sidebarHeader}>
            <div className={styles.searchSkeleton}></div>
        </div>
        <div className={styles.sidebarContent}>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.chapterSkeleton}>
                    <div className={styles.lineSkeleton}></div>
                    <div className={`${styles.lineSkeleton} ${styles.short}`}></div>
                </div>
            ))}
        </div>
    </div>
);


const SyllabusSidebar: React.FC<SyllabusSidebarProps> = ({ syllabus, isLoading, isCollapsed, toggleCollapse }) => {
    const params = useParams();
    const courseId = params.id as string;
    const activePointId = params.pointId as string;
    const router = useRouter();

    // 状态：用于控制哪些章节/分节是展开的
    const [expandedItems, setExpandedItems] = useState<Set<string | number>>(new Set());

    // 当大纲数据或当前知识点变化时，智能计算并设置默认展开项
    useEffect(() => {
        if (syllabus?.chapters) {
            const newExpanded = new Set<string | number>();
            let found = false;
            for (const chapter of syllabus.chapters) {
                for (const section of chapter.sections) {
                    if (section.points.some(p => String(p.id) === activePointId)) {
                        newExpanded.add(chapter.id);
                        newExpanded.add(section.id);
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
            // 如果没找到当前激活的知识点，默认展开第一章
            if (!found && syllabus.chapters.length > 0) {
                newExpanded.add(syllabus.chapters[0].id);
            }
            setExpandedItems(newExpanded);
        }
    }, [syllabus, activePointId]);

    const handleToggleItem = (id: string | number) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    // Framer Motion 动画变体
    const sidebarVariants = {
        open: { width: 300, transition: { type: 'spring', stiffness: 400, damping: 40 } },
        collapsed: { width: 0, transition: { type: 'spring', stiffness: 400, damping: 40 } }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.1 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
    };

    return (
        <div className={styles.sidebarWrapper}>
            <AnimatePresence>
                {!isCollapsed && (
                    <motion.aside
                        className={styles.sidebar}
                        variants={sidebarVariants}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                    >
                        <motion.div className={styles.sidebarInner} variants={contentVariants} initial="hidden" animate="visible" exit="hidden">
                            <header className={styles.sidebarHeader}>
                                <div className={styles.searchBar}>
                                    <i className="fas fa-search"></i>
                                    <input type="text" placeholder="搜索知识点..." />
                                </div>
                            </header>

                            <nav className={styles.sidebarContent}>
                                {isLoading ? (
                                    <SidebarSkeleton />
                                ) : (
                                    syllabus?.chapters.map(chapter => (
                                        <ChapterNode
                                            key={chapter.id}
                                            chapter={chapter}
                                            activePointId={activePointId}
                                            expandedItems={expandedItems}
                                            onToggleItem={handleToggleItem}
                                        />
                                    ))
                                )}
                            </nav>

                            <footer className={styles.sidebarFooter}>
                                <Tooltip content="返回课程大纲" position="top">
                                    <button onClick={() => router.push(`/teacher/courses/${courseId}/syllabus`)} className={styles.backButton}>
                                        <i className="fas fa-arrow-left"></i>
                                        <span>返回大纲总览</span>
                                    </button>
                                </Tooltip>
                            </footer>
                        </motion.div>
                    </motion.aside>
                )}
            </AnimatePresence>

            <button
                className={styles.toggleButton}
                onClick={toggleCollapse}
                title={isCollapsed ? '展开目录' : '收起目录'}
            >
                <motion.i
                    className="fas fa-chevron-left"
                    animate={{ rotate: isCollapsed ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                />
            </button>
        </div>
    );
};

export default SyllabusSidebar;