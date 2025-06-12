// src/components/student/component/leaderboard/RankingCard.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './RankingCard.module.css';
import type { Agent } from '@/lib/data/agentData';

interface RankingCardProps {
    agent: Agent;
    rank: number;
}

const RankingCard: React.FC<RankingCardProps> = ({ agent, rank }) => {

    const getRankClass = (rank: number) => {
        if (rank === 1) return styles.rank1;
        if (rank === 2) return styles.rank2;
        if (rank === 3) return styles.rank3;
        return '';
    };

    return (
        <motion.div
            className={`${styles.card} ${getRankClass(rank)}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: (rank - 1) * 0.05 % 1 }}
            whileHover={{ scale: 1.02, zIndex: 2 }}
        >
            <div className={styles.rankNumber}>{rank}</div>

            <div className={styles.agentInfo}>
                <div className={styles.avatar} style={{ background: agent.avatarGradient }}>
                    {agent.avatarText}
                </div>
                <div className={styles.textInfo}>
                    <h4>{agent.name}</h4>
                    <p>创作者: {agent.creator}</p>
                </div>
            </div>

            <div className={styles.agentTags}>
                {agent.skills.slice(0, 3).map(skill => (
                    <span key={skill} className={styles.tag}>{skill}</span>
                ))}
            </div>

            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <i className="fas fa-fire"></i>
                    <span>{agent.hotness.toLocaleString()}</span>
                    <label>热度值</label>
                </div>
                <div className={styles.statItem}>
                    <i className="fas fa-users"></i>
                    <span>{agent.userCount}</span>
                    <label>使用人数</label>
                </div>
                <div className={styles.statItem}>
                    <i className="fas fa-microchip"></i>
                    <span>{agent.model}</span>
                    <label>核心模型</label>
                </div>
            </div>

            <div className={styles.actionButton}>
                <i className="fas fa-angle-right"></i>
            </div>
        </motion.div>
    );
};

export default RankingCard;