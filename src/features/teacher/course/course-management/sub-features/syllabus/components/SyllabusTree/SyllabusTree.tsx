"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
// [!code focus start]
// 1. 导入我们新的领域类型
import { ChapterVO, SectionVO, KnowledgePoint } from '../../types';
// [!code focus end]
import styles from './SyllabusTree.module.css';

// --- Props 定义 ---
interface SyllabusTreeProps {
    // 2. 更新 Props，使用 ChapterVO[]
    chapters: ChapterVO[];
    expandedItems: Set<string | number>; // ID 可能是数字
    toggleItem: (id: string | number) => void;
}

// --- 子组件定义 (将接收真实数据) ---

const PointNode: React.FC<{ point: KnowledgePoint }> = ({ point }) => {
    // 3. 动态生成指向知识点详情页的链接
    const params = useParams();
    const courseId = params.id;
    const typeStyleMap: Record<string, string> = {
        '核心': styles.typeCore,
        '重点': styles.typeImportant,
        '选学': styles.typeOptional,
    };

    return (
        <Link href={`/teacher/courses/${courseId}/syllabus/${point.id}`} className={styles.pointNode}>
            <span className={`${styles.pointType} ${typeStyleMap[point.type] || styles.typeOptional}`}>
                {point.type}
            </span>
            <span className={styles.pointTitle}>{point.title}</span>
            <div className={styles.pointActions}>
                <button title="查看详情"><i className="far fa-eye"></i></button>
                <button title="生成习题"><i className="fas fa-question"></i></button>
                <button title="相关资源"><i className="fas fa-link"></i></button>
            </div>
        </Link>
    );
};

const SectionNode: React.FC<{ section: SectionVO; isExpanded: boolean; onToggle: () => void; }> = ({ section, isExpanded, onToggle }) => (
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

const ChapterNode: React.FC<{ chapter: ChapterVO; isExpanded: boolean; onToggle: () => void; expandedItems: Set<string | number>; toggleItem: (id: string | number) => void; }> = ({ chapter, isExpanded, onToggle, expandedItems, toggleItem }) => (
    <motion.div
        className={styles.chapterNode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <div className={styles.chapterHeader} onClick={onToggle}>
            <div className={styles.chapterIcon}>
                {/* 暂时使用默认图标，未来可从 chapter.icon 获取 */}
                <i className={"fas fa-book-open"}></i>
            </div>
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

// [!code focus start]
// 4. 新增优雅的空状态组件
const EmptyState = () => (
    <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
            <i className="fas fa-sitemap"></i>
        </div>
        <h2>课程大纲为空</h2>
        <p>这门课程还没有任何内容，请先在“大纲管理”中添加章节。</p>
    </div>
);
// [!code focus end]

// --- 主组件 ---
const SyllabusTree: React.FC<SyllabusTreeProps> = ({ chapters, expandedItems, toggleItem }) => {
    // 5. 处理数据为空的情况
    if (!chapters || chapters.length === 0) {
        return <EmptyState />;
    }

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