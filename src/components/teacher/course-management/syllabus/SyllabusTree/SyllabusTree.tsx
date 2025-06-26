// src/components/teacher/course-management/syllabus/SyllabusTree/SyllabusTree.tsx
"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SyllabusChapter, SyllabusSection, KnowledgePoint, KnowledgePointType } from '@/lib/data/syllabusData';
import styles from './SyllabusTree.module.css';

// --- Props 定义 ---
interface SyllabusTreeProps {
    chapters: SyllabusChapter[];
    expandedItems: Set<string>;
    toggleItem: (id: string) => void;
}

// --- 子组件定义 ---

const PointNode: React.FC<{ point: KnowledgePoint }> = ({ point }) => {
    const typeStyleMap: Record<KnowledgePointType, string> = {
        '核心': styles.typeCore,
        '重点': styles.typeImportant,
        '选学': styles.typeOptional,
    };
    return (
        <div className={styles.pointNode}>
            <span className={`${styles.pointType} ${typeStyleMap[point.type]}`}>{point.type}</span>
            <span className={styles.pointTitle}>{point.title}</span>
            <div className={styles.pointActions}>
                <button title="查看详情"><i className="far fa-eye"></i></button>
                <button title="生成习题"><i className="fas fa-question"></i></button>
                <button title="相关资源"><i className="fas fa-link"></i></button>
            </div>
        </div>
    );
};

const SectionNode: React.FC<{ section: SyllabusSection; isExpanded: boolean; onToggle: () => void; }> = ({ section, isExpanded, onToggle }) => (
    <div className={styles.sectionNode}>
        <div className={styles.sectionHeader} onClick={onToggle}>
            <i className={`fas fa-chevron-right ${styles.chevron} ${isExpanded ? styles.expanded : ''}`}></i>
            <h4 className={styles.sectionTitle}>{section.title}</h4>
        </div>
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={styles.pointList}
                >
                    {section.points.map(point => <PointNode key={point.id} point={point} />)}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const ChapterNode: React.FC<{ chapter: SyllabusChapter; isExpanded: boolean; onToggle: () => void; expandedItems: Set<string>; toggleItem: (id: string) => void; }> = ({ chapter, isExpanded, onToggle, expandedItems, toggleItem }) => (
    <motion.div
        className={styles.chapterNode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <div className={styles.chapterHeader} onClick={onToggle}>
            <div className={styles.chapterIcon}><i className={chapter.icon}></i></div>
            <div className={styles.chapterInfo}>
                <h3 className={styles.chapterTitle}>{chapter.title}</h3>
                <p className={styles.chapterDesc}>{chapter.description}</p>
            </div>
            <i className={`fas fa-chevron-down ${styles.chevron} ${isExpanded ? styles.expanded : ''}`}></i>
        </div>
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={styles.sectionList}
                >
                    {chapter.sections.map(section => (
                        <SectionNode
                            key={section.id}
                            section={section}
                            isExpanded={expandedItems.has(section.id)}
                            onToggle={() => toggleItem(section.id)}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

// --- 主组件 ---
const SyllabusTree: React.FC<SyllabusTreeProps> = ({ chapters, expandedItems, toggleItem }) => {
    return (
        <div className={styles.treeContainer}>
            {chapters.map(chapter => (
                <ChapterNode
                    key={chapter.id}
                    chapter={chapter}
                    isExpanded={expandedItems.has(chapter.id)}
                    onToggle={() => toggleItem(chapter.id)}
                    expandedItems={expandedItems}
                    toggleItem={toggleItem}
                />
            ))}
        </div>
    );
};

export default SyllabusTree;