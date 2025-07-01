"use client";
import React, { useState, useMemo } from 'react';
import styles from './myAgents.module.css';
import { myAgentsData } from '@/shared/lib/data/myAgentsData';
import MyAgentsHeader from '@/features/student/sub-features/my-agents/MyAgentsHeader/MyAgentsHeader';
import MyAgentsToolbar from '@/features/student/sub-features/my-agents/MyAgentsToolbar/MyAgentsToolbar';
import AgentTabs from '@/features/student/sub-features/my-agents/AgentTabs/AgentTabs';
import AgentList from '@/features/student/sub-features/my-agents/AgentList/AgentList';

export default function MyAgentsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('lastUsed');

    const filteredAndSortedAgents = useMemo(() => {
        let agents = myAgentsData;

        // 1. Filter by active tab
        if (activeTab !== 'all') {
            agents = agents.filter(agent => agent.type === activeTab);
        }

        // 2. Filter by search query
        if (searchQuery.trim() !== '') {
            const lowerCaseQuery = searchQuery.toLowerCase();
            agents = agents.filter(agent =>
                agent.name.toLowerCase().includes(lowerCaseQuery) ||
                agent.description.toLowerCase().includes(lowerCaseQuery) ||
                agent.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
            );
        }

        // 3. Sort
        agents.sort((a, b) => {
            if (sortOption === 'name') {
                return a.name.localeCompare(b.name, 'zh-CN');
            }
            if (sortOption === 'usageCount') {
                return b.usageCount - a.usageCount;
            }
            // Default: lastUsed (complex logic for relative dates, simplified here)
            // A more robust solution would convert 'lastUsed' to a date object.
            // For this mock, we'll just give a basic sort.
            return 0;
        });

        return agents;
    }, [activeTab, searchQuery, sortOption]);

    return (
        <div className={styles.pageContainer}>
            <MyAgentsHeader />
            <div className={styles.mainContent}>
                <MyAgentsToolbar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                />
                <AgentTabs
                    agents={myAgentsData}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
                <AgentList agents={filteredAndSortedAgents} />
            </div>
        </div>
    );
}