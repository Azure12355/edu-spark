// [!file src/features/student/assignment/plaza/AssignmentPlazaPage.tsx]
"use client";

import React from 'react';
import styles from './AssignmentPlazaPage.module.css';
import { useAssignmentPlaza } from './hooks/useAssignmentPlaza';
import AssignmentToolbar from './components/AssignmentToolbar/AssignmentToolbar';
import AssignmentCard from './components/AssignmentCard/AssignmentCard';

const AssignmentPlazaPage = () => {
    const {
        activities,
        isLoading,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery
    } = useAssignmentPlaza();

    return (
        <div className={styles.plazaContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>在线练习中心</h1>
            </header>

            <AssignmentToolbar
                filter={filter}
                onFilterChange={setFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {isLoading ? (
                <p>加载中...</p> // 未来可以替换为骨架屏
            ) : (
                <div className={styles.gridContainer}>
                    {activities.map(activity => (
                        <AssignmentCard key={activity.id} activity={activity} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AssignmentPlazaPage;