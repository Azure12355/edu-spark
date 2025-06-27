"use client";
import React from 'react';
import styles from './KnowledgeDetailLayout.module.css';
import DocumentHeader from '@/components/teacher/knowledge/detail/DocumentTab/DocumentHeader/DocumentHeader';
import DocumentTabs from '@/components/teacher/knowledge/detail/DocumentTab/DocumentTabs/DocumentTabs';
import {KnowledgeBase} from "@/types/knowledge";

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