"use client";
import React from 'react';
import styles from './KnowledgeDetailLayout.module.css';
import DocumentHeader from '../detail/DocumentHeader';
import DocumentTabs from '../detail/DocumentTabs';
import { KnowledgeBase } from '@/lib/data/knowledgeData';

interface KnowledgeDetailLayoutProps {
    kb: KnowledgeBase;
    activeTab: string;
    onTabChange: (tab: string) => void;
    children: React.ReactNode;
}

const KnowledgeDetailLayout: React.FC<KnowledgeDetailLayoutProps> = ({ kb, activeTab, onTabChange, children }) => {
    return (
        <div className={styles.layoutContainer}>
            <div className={styles.headerWrapper}>
                <DocumentHeader kb={kb} />
            </div>
            <div className={styles.tabsWrapper}>
                <DocumentTabs activeTab={activeTab} onTabChange={onTabChange} />
            </div>
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
};

export default KnowledgeDetailLayout;