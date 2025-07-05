// [!file src/features/teacher/course/course-management/sub-features/point-detail/components/AuxiliarySidebar/AuxiliarySidebar.tsx]
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './AuxiliarySidebar.module.css';
import TableOfContents, { TocItem } from './TableOfContents';
import HotQuestions, { HotQuestion } from './HotQuestions';

interface AuxiliarySidebarProps {
    toc: TocItem[];
    hotQuestions: HotQuestion[];
    activeTocId: string;
    onTocLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
    isLoading: boolean;
}

const sidebarVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut', delay: 0.2 } },
};

const AuxiliarySidebar: React.FC<AuxiliarySidebarProps> = ({ toc, hotQuestions, activeTocId, onTocLinkClick, isLoading }) => {
    return (
        <motion.aside
            className={styles.sidebar}
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
        >
            <TableOfContents
                toc={toc}
                activeTocId={activeTocId}
                onLinkClick={onTocLinkClick}
                isLoading={isLoading}
            />
            <HotQuestions questions={hotQuestions} />
        </motion.aside>
    );
};

export default AuxiliarySidebar;