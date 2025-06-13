"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './AgentCard.module.css';
import { MyAgent } from '@/lib/data/myAgentsData';

interface CardProps {
    agent: MyAgent;
}

const AgentCard: React.FC<CardProps> = ({ agent }) => {
    return (
        <motion.div
            className={styles.card}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            layout
        >
            <div className={styles.cardHeader}>
                <div className={styles.icon} style={{ backgroundColor: agent.color }}>
                    <i className={agent.icon}></i>
                </div>
                <div className={styles.titleWrapper}>
                    <h3 className={styles.agentName}>{agent.name}</h3>
                    {agent.type === 'course' && agent.courseName && (
                        <p className={styles.courseName}>{agent.courseName}</p>
                    )}
                    {agent.type === 'created' && agent.status && (
                        <span className={`${styles.statusBadge} ${styles[agent.status]}`}>{agent.status === 'published' ? '已发布' : '草稿'}</span>
                    )}
                </div>
            </div>
            <p className={styles.description}>{agent.description}</p>
            <div className={styles.tags}>
                {agent.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.footerInfo}>
                    <i className="far fa-clock"></i>
                    <span>上次使用: {agent.lastUsed}</span>
                </div>
                <div className={styles.footerInfo}>
                    <i className="fas fa-fire"></i>
                    <span>使用 {agent.usageCount} 次</span>
                </div>
            </div>
        </motion.div>
    );
};
export default AgentCard;