"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { KnowledgeBaseVO } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService';
import KnowledgeDetailHeader from './KnowledgeDetailHeader';
import KnowledgeDetailTabs from './KnowledgeDetailTabs';
import styles from './KnowledgeDetailLayout.module.css';

const TABS_CONFIG = [
    { id: 'BasicInfo', label: '基本信息' },
    { id: 'Documents', label: '原始文档' },
    { id: 'Chunks', label: '切片详情' },
    { id: 'RetrievalTest', label: '知识检索' },
    { id: 'QATest', label: '知识问答' },
    { id: 'Statistics', label: '使用统计' },
];

// 【核心修改1】: 更新 Props，移除 children，添加 tabContent, activeTab, onTabChange
interface KnowledgeDetailLayoutProps {
    kb: KnowledgeBaseVO;
    tabContent: React.ReactNode;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const KnowledgeDetailLayout: React.FC<KnowledgeDetailLayoutProps> = ({ kb, tabContent, activeTab, onTabChange }) => {
    return (
        <div className={styles.layoutContainer}>
            <header className={styles.headerWrapper}>
                <KnowledgeDetailHeader kb={kb} />
            </header>

            <nav className={styles.tabsWrapper}>
                {/* 【核心修改2】: 将 props 传递给 Tabs 组件 */}
                <KnowledgeDetailTabs
                    tabs={TABS_CONFIG.map(t => t.label)}
                    activeTab={activeTab}
                    onTabChange={onTabChange}
                />
            </nav>

            <motion.main
                key={activeTab} // key 保持不变，用于触发动画
                className={styles.mainContent}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                {/* 【核心修改3】: 渲染 tabContent prop */}
                {tabContent}
            </motion.main>
        </div>
    );
};

export default KnowledgeDetailLayout;