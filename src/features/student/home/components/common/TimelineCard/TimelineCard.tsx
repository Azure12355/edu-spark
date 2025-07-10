"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Landmark } from 'lucide-react';
import styles from './TimelineCard.module.css';

export interface TimelineCardData {
    id: string;
    year: string;           // 关键年份，例如 "1453"
    title: string;          // 事件标题，例如 "君士坦丁堡陷落"
    description: string;    // 事件的简短描述
    era: string;            // 所属时代或领域，例如 "中世纪晚期"
    theme: 'war' | 'discovery' | 'art' | 'science'; // 主题，用于决定颜色
}

interface TimelineCardProps {
    card: TimelineCardData;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ card }) => {
    return (
        <motion.div
            className={`${styles.cardWrapper} ${styles[card.theme]}`}
            whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {/* 时间轴的垂直线和节点 */}
            <div className={styles.timelineTrack}>
                <div className={styles.timelineNode}></div>
            </div>

            {/* 卡片主要内容区 */}
            <div className={styles.contentArea}>
                <div className={styles.header}>
                    <span className={styles.year}>{card.year}</span>
                    <span className={styles.eraTag}>{card.era}</span>
                </div>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.description}>{card.description}</p>
            </div>

            {/* 背景装饰性图标 */}
            <div className={styles.backgroundIcon}>
                <Landmark size={120} />
            </div>
        </motion.div>
    );
};

export default TimelineCard;