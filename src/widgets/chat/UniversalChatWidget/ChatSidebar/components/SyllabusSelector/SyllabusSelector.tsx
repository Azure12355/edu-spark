// [!file src/widgets/chat/UniversalChatWidget/ChatSidebar/components/SyllabusSelector/SyllabusSelector.tsx]
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourseVO, SyllabusVO } from '@/shared/types';
import { SelectedNode } from '@/features/teacher/assistant/ai-assistant/hooks/useTeacherAssistant';
import styles from './SyllabusSelector.module.css';

// --- Props Definition ---
interface SyllabusSelectorProps {
    course: CourseVO | null;
    syllabus: SyllabusVO | null;
    selectedNode: SelectedNode | null;
    onNodeSelect: (node: SelectedNode) => void;
    isLoading: boolean;
}

// --- Skeleton Loader Component ---
const SyllabusSkeleton = () => (
    <div className={styles.skeletonContainer}>
        {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.skeletonItem} style={{ marginLeft: `${(i % 3) * 15}px` }}>
                <div className={styles.skeletonIcon}></div>
                <div className={styles.skeletonText}></div>
            </div>
        ))}
    </div>
);

// --- Main Component ---
const SyllabusSelector: React.FC<SyllabusSelectorProps> = ({ course, syllabus, selectedNode, onNodeSelect, isLoading }) => {
    const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

    const handleToggleChapter = (chapterId: number) => {
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

    if (isLoading) {
        return <SyllabusSkeleton />;
    }

    if (!course || !syllabus || syllabus.chapters.length === 0) {
        return <div className={styles.emptyState}>当前课程暂无教学大纲</div>;
    }

    // A helper to create a consistent node item
    const renderNode = (node: SelectedNode, level: number, iconClass: string, isExpandable?: boolean, isExpanded?: boolean, onToggle?: () => void) => {
        const isActive = selectedNode?.id === node.id && selectedNode.type === node.type;
        return (
            <li
                className={`${styles.nodeItem} ${isActive ? styles.active : ''}`}
                style={{ paddingLeft: `${10 + level * 20}px` }}
                onClick={() => onNodeSelect(node)}
            >
                {isExpandable && (
                    <i
                        className={`fas fa-chevron-right ${styles.toggleIcon} ${isExpanded ? styles.expanded : ''}`}
                        onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
                    />
                )}
                <i className={`${iconClass} ${styles.typeIcon}`}></i>
                <span className={styles.nodeTitle}>{node.name}</span>
            </li>
        );
    };

    return (
        <div className={styles.selectorContainer}>
            <ul className={styles.treeList}>
                {/* Root Node: Entire Course */}
                {renderNode({ id: course.id, type: 'course', name: course.name }, 0, 'fas fa-school')}

                {/* Chapters */}
                {syllabus.chapters.map(chapter => (
                    <React.Fragment key={chapter.id}>
                        {renderNode(
                            { id: chapter.id, type: 'chapter', name: chapter.title },
                            1,
                            'fas fa-book-open',
                            true,
                            expandedChapters.has(chapter.id),
                            () => handleToggleChapter(chapter.id)
                        )}
                        <AnimatePresence>
                            {expandedChapters.has(chapter.id) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <ul>
                                        {/* Sections */}
                                        {chapter.sections.map(section => (
                                            <React.Fragment key={section.id}>
                                                {renderNode({ id: section.id, type: 'section', name: section.title }, 2, 'fas fa-folder')}
                                                {/* Points */}
                                                <ul>
                                                    {section.points.map(point => (
                                                        <React.Fragment key={point.id}>
                                                            {renderNode({ id: point.id, type: 'point', name: point.title }, 3, 'fas fa-file-alt')}
                                                        </React.Fragment>
                                                    ))}
                                                </ul>
                                            </React.Fragment>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default SyllabusSelector;