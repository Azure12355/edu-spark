// src/components/teacher/course-management/questions/SyllabusNavigator.tsx
"use client";
import React, { useState, useMemo } from 'react';
import { useSyllabusStore } from '@/store/syllabusStore';
import { useQuestionBankStore } from '@/store/questionBankStore';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SyllabusNavigator.module.css';

interface SyllabusNavigatorProps {
    selectedPointId: string | null;
    onSelectPoint: (pointId: string) => void;
}

const SyllabusNavigator: React.FC<SyllabusNavigatorProps> = ({ selectedPointId, onSelectPoint }) => {
    const { syllabus } = useSyllabusStore();
    const { questionBank } = useQuestionBankStore();
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(() => {
        // 默认展开包含选中项的章节
        if (selectedPointId) {
            for (const chapter of syllabus) {
                for (const section of chapter.sections) {
                    if (section.points.some(p => p.id === selectedPointId)) {
                        return new Set([chapter.id]);
                    }
                }
            }
        }
        return new Set([syllabus[0]?.id]); // 默认展开第一章
    });

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters(prev => {
            const newSet = new Set(prev);
            if (newSet.has(chapterId)) {
                newSet.delete(chapterId);
            } else {
                newSet.add(chapterId);
            }
            return newSet;
        });
    };

    return (
        <div className={styles.navigatorContainer}>
            <header className={styles.header}>
                <i className={`fas fa-sitemap ${styles.headerIcon}`}></i>
                <h2 className={styles.headerTitle}>知识点导航</h2>
            </header>
            <div className={styles.treeView}>
                {syllabus.map(chapter => (
                    <div key={chapter.id} className={styles.chapterNode}>
                        <div className={styles.chapterTitle} onClick={() => toggleChapter(chapter.id)}>
                            <i className={`fas fa-chevron-right ${styles.chevron} ${expandedChapters.has(chapter.id) ? styles.expanded : ''}`}></i>
                            <span>{chapter.title}</span>
                        </div>
                        <AnimatePresence>
                            {expandedChapters.has(chapter.id) && (
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
                                                        <span>{point.title}</span>
                                                        <span className={styles.questionCount}>
                                                            {questionBank[point.id]?.length || 0}
                                                        </span>
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
        </div>
    );
};

export default SyllabusNavigator;