"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AgentList.module.css';
import AgentCard from './AgentCard';
import { MyAgent } from '@/lib/data/myAgentsData';

interface ListProps {
    agents: MyAgent[];
}

const AgentList: React.FC<ListProps> = ({ agents }) => {
    return (
        <motion.div className={styles.grid} layout>
            <AnimatePresence>
                {agents.map(agent => (
                    <motion.div
                        key={agent.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AgentCard agent={agent} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default AgentList;