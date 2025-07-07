// [!file src/features/teacher/course/course-management/sub-features/point-detail/components/SyllabusSidebar/SectionNode.tsx]
import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import styles from './SyllabusSidebar.module.css';
import {SectionVO} from "@/shared/types";

interface SectionNodeProps {
    section: SectionVO;
    activePointId: string;
    expandedItems: Set<string | number>;
    onToggleItem: (id: string | number) => void;
}

const SectionNode: React.FC<SectionNodeProps> = ({ section, activePointId, expandedItems, onToggleItem }) => {
    const params = useParams();
    const courseId = params.id as string;
    const isExpanded = expandedItems.has(section.id);
    // 性能优化
    const hasActiveChild = useMemo(() =>
            section.points.some(p => String(p.id) === activePointId),
        [section.points, activePointId]
    );

    const itemVariants = {
        open: { opacity: 1, x: 0 },
        collapsed: { opacity: 0, x: -10 },
    };

    return (
        <motion.li className={`${styles.sectionNode} ${hasActiveChild ? styles.hasActiveChild : ''}`} variants={itemVariants}>
            <div className={styles.sectionTitle} onClick={() => onToggleItem(section.id)}>
                <i className={`fas fa-chevron-right ${styles.chevron} ${isExpanded ? styles.expanded : ''}`}></i>
                <span className={styles.sectionText}>{section.title}</span>
            </div>
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.ul
                        className={styles.pointList}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { height: 'auto', opacity: 1 },
                            collapsed: { height: 0, opacity: 0 }
                        }}
                    >
                        {section.points.map(point => (
                            <li key={point.id}>
                                <Link
                                    href={`/teacher/courses/${courseId}/syllabus/${point.id}`}
                                    className={`${styles.pointLink} ${String(point.id) === activePointId ? styles.active : ''}`}
                                >
                                    {point.title}
                                </Link>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.li>
    );
};

export default SectionNode;