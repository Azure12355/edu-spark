"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
    title: string;
    showMoreLink?: boolean;
    moreLinkHref?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
                                                         title,
                                                         showMoreLink = true,
                                                         moreLinkHref = '#'
                                                     }) => {
    return (
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            {showMoreLink && (
                <a href={moreLinkHref} className={styles.seeMoreLink}>
                    更多 <ChevronRight size={16} />
                </a>
            )}
        </div>
    );
};

export default SectionHeader;