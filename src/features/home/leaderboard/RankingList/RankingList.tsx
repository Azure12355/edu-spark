// src/components/student/component/leaderboard/RankingList.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './RankingList.module.css';
import RankingCard from '../RankingCard/RankingCard';
import type { Agent } from '@/shared/lib/data/agentData';

interface RankingListProps {
    agents: Agent[];
}

const ITEMS_PER_PAGE = 10;

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
    const pageNumbers = [];
    // Logic to create page number array, including ellipsis (...)
    // This can be a complex logic, for now, we'll keep it simple
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        pageNumbers.push(1);
        if (currentPage > 3) pageNumbers.push('...');

        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (currentPage < totalPages - 2) pageNumbers.push('...');
        pageNumbers.push(totalPages);
    }

    return (
        <div className={styles.pagination}>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                {'<'}
            </button>
            {pageNumbers.map((num, index) => (
                typeof num === 'string' ? (
                    <span key={`dots-${index}`} className={styles.ellipsis}>{num}</span>
                ) : (
                    <button
                        key={num}
                        onClick={() => onPageChange(num)}
                        className={currentPage === num ? styles.active : ''}
                    >
                        {num}
                    </button>
                )
            ))}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                {'<'}
            </button>
        </div>
    );
};

const RankingList: React.FC<RankingListProps> = ({ agents }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(agents.length / ITEMS_PER_PAGE);

    const paginatedAgents = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return agents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [agents, currentPage]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Reset to page 1 if the agents list changes (e.g., due to filtering)
    React.useEffect(() => {
        setCurrentPage(1);
    }, [agents]);

    return (
        <div className={styles.listContainer}>
            <AnimatePresence>
                <motion.div
                    key={currentPage} // Animate when page changes
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.list}
                >
                    {paginatedAgents.map((agent, index) => (
                        <RankingCard
                            key={agent.id}
                            agent={agent}
                            rank={(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default RankingList;