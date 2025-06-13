"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './AgentTabs.module.css';
import { MyAgent } from '@/lib/data/myAgentsData';

interface TabsProps {
    agents: MyAgent[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const AgentTabs: React.FC<TabsProps> = ({ agents, activeTab, onTabChange }) => {
    const tabs = [
        { id: 'all', name: '全部' },
        { id: 'favorite', name: '我收藏的' },
        { id: 'created', name: '我创建的' },
        { id: 'course', name: '我的课程' },
    ];

    const getCount = (type: string) => {
        if (type === 'all') return agents.length;
        return agents.filter(a => a.type === type).length;
    };

    return (
        <div className={styles.tabsContainer}>
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="activeAgentTabPill"
                            className={styles.activePill}
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                    )}
                    <span className={styles.tabText}>{tab.name}</span>
                    <span className={styles.tabCount}>{getCount(tab.id)}</span>
                </button>
            ))}
        </div>
    );
};

export default AgentTabs;