// src/components/teacher/course-management/questions/SyllabusNavigator.tsx
"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSyllabusStore } from '@/store/syllabusStore';
import { useQuestionBankStore } from '@/store/questionBankStore';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SyllabusNavigator.module.css';
import Tooltip from '@/components/common/Tooltip/Tooltip';

interface SyllabusNavigatorProps {
    selectedPointId: string | null;
    onSelectPoint: (pointId: string) => void;
}

const SyllabusNavigator: React.FC<SyllabusNavigatorProps> = ({ selectedPointId, onSelectPoint }) => {
    const { syllabus } = useSyllabusStore();
    const { questionBank } = useQuestionBankStore();
    const params = useParams();
    const courseId = params.id;

    const [isCollapsed, setIsCollapsed] = useState(false);

    // 默认展开选中项所在的章节，否则展开第一章
    const defaultExpandedChapters = useMemo(() => {
        if (selectedPointId) {
            for (const chapter of syllabus) {
                if (chapter.sections.some(section => section.points.some(p => p.id === selectedPointId))) {
                    return new Set([chapter.id]);
                }
            }
        }
        return new Set(syllabus.length > 0 ? [syllabus[0].id] : []);
    }, [selectedPointId, syllabus]);

    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(defaultExpandedChapters);

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters(prev => {
            const newSet = new Set(prev);
            if (newSet.has(chapterId)) newSet.delete(chapterId);
            else newSet.add(chapterId);
            return newSet;
        });
    };

    // Framer Motion 动画变体
    const sidebarVariants = {
        open: { width: 320 },
        collapsed: { width: 60 }
    };

    const textVariants = {
        open: { opacity: 1, x: 0, display: 'block', transition: { duration: 0.2, delay: 0.1 } },
        collapsed: { opacity: 0, x: -10, transition: { duration: 0.1 }, transitionEnd: { display: 'none' } }
    };

    return (
        <motion.div
            className={styles.navigatorContainer}
            variants={sidebarVariants}
            animate={isCollapsed ? "collapsed" : "open"}
            initial={false}
        >
            <button className={styles.toggleButton} onClick={() => setIsCollapsed(!isCollapsed)} title={isCollapsed ? '展开' : '收起'}>
                <motion.i className={`fas fa-chevron-left ${styles.icon}`} animate={{ rotate: isCollapsed ? 180 : 0 }} />
            </button>
            <header className={styles.header}>
                <i className={`fas fa-sitemap ${styles.headerIcon}`}></i>
                <motion.h2 variants={textVariants} className={styles.headerTitle}>知识点导航</motion.h2>
            </header>
            <div className={styles.treeView}>
                {syllabus.map(chapter => (
                    <div key={chapter.id} className={styles.chapterNode}>
                        <Tooltip content={chapter.title} position="right" >
                            <div className={`${styles.chapterTitle} ${isCollapsed ? styles.collapsed : ''}`} onClick={() => toggleChapter(chapter.id)}>
                                <i className={chapter.icon || 'fas fa-book-open'}></i>
                                <motion.span variants={textVariants}>{chapter.title}</motion.span>
                                <motion.i variants={textVariants} className={`fas fa-chevron-right ${styles.chevron} ${expandedChapters.has(chapter.id) ? styles.expanded : ''}`}></motion.i>
                            </div>
                        </Tooltip>
                        <AnimatePresence>
                            {!isCollapsed && expandedChapters.has(chapter.id) && (
                                <motion.ul
                                    className={styles.sectionList}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {chapter.sections.map(section => (
                                        <li key={section.id}>
                                            <h4 className={styles.sectionTitle}>{section.title}</h4>
                                            <ul className={styles.pointList}>
                                                {section.points.map(point => (
                                                    <li
                                                        key={point.id}
                                                        className={`${styles.pointItem} ${selectedPointId === point.id ? styles.active : ''}`}
                                                        onClick={() => onSelectPoint(point.id)}
                                                    >
                                                        <span className={styles.pointText}>{point.title}</span>
                                                        <span className={styles.questionCount}>{questionBank[point.id]?.length || 0}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <footer className={styles.footer}>
                <Tooltip content="返回我的课程" position="right" >
                    <Link href={`/teacher/courses`} className={`${styles.backButton} ${isCollapsed ? styles.collapsed : ''}`}>
                        <i className="fas fa-arrow-left"></i>
                        <motion.span variants={textVariants} className={styles.buttonText}>返回我的课程</motion.span>
                    </Link>
                </Tooltip>
            </footer>
        </motion.div>
    );
};

export default SyllabusNavigator;