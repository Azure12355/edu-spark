// [!file src/features/teacher/course/course-management/sub-features/point-detail/components/SyllabusSidebar/ChapterNode.tsx]
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterVO } from '../../types';
import SectionNode from './SectionNode';
import styles from './SyllabusSidebar.module.css';

interface ChapterNodeProps {
    chapter: ChapterVO;
    activePointId: string;
    expandedItems: Set<string | number>;
    onToggleItem: (id: string | number) => void;
}

const ChapterNode: React.FC<ChapterNodeProps> = ({ chapter, activePointId, expandedItems, onToggleItem }) => {
    const isExpanded = expandedItems.has(chapter.id);
    // 性能优化：仅在依赖项变化时重新计算
    const hasActiveChild = useMemo(() =>
            chapter.sections.some(s => s.points.some(p => String(p.id) === activePointId)),
        [chapter.sections, activePointId]
    );

    return (
        <div className={`${styles.chapterNode} ${hasActiveChild ? styles.hasActiveChild : ''}`}>
            <div className={styles.chapterTitle} onClick={() => onToggleItem(chapter.id)}>
                <i className={`${styles.chapterIcon} fas fa-book-open`}></i>
                <span className={styles.chapterText}>{chapter.title}</span>
                <i className={`fas fa-chevron-down ${styles.chevron} ${isExpanded ? styles.expanded : ''}`}></i>
            </div>
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.ul
                        className={styles.sectionList}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { height: 'auto', opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.05 } },
                            collapsed: { height: 0, opacity: 0, transition: { when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 } }
                        }}
                    >
                        {chapter.sections.map(section => (
                            <SectionNode
                                key={section.id}
                                section={section}
                                activePointId={activePointId}
                                expandedItems={expandedItems}
                                onToggleItem={onToggleItem}
                            />
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChapterNode;