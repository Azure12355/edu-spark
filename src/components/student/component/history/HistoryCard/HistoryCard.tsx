"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './HistoryCard.module.css';
import { agentData } from '@/lib/data/agentData';
import { HistoryEntry } from '@/lib/data/historyData';

interface HistoryCardProps {
    history: HistoryEntry;
    index: number;
}

// 格式化时间戳
const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = (now.getTime() - date.getTime()) / 1000;

    if (diffInSeconds < 60) return "刚刚";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分钟前`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}小时前`;

    return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
};

const HistoryCard: React.FC<HistoryCardProps> = ({ history, index }) => {
    const agent = agentData.find(a => a.id === history.agentId);

    if (!agent) {
        return null; // 如果找不到对应的Agent，则不渲染卡片
    }

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
        >
            <div className={styles.cardHeader}>
                <div className={styles.avatar} style={{ background: agent.avatarGradient }}>
                    {agent.avatarText}
                </div>
                <div className={styles.agentInfo}>
                    <h4>{agent.name}</h4>
                    <p>by {agent.creator}</p>
                </div>
            </div>

            <div className={styles.conversationSnippet}>
                <div className={styles.message}>
                    <div className={`${styles.messageIcon} ${styles.userIcon}`}>
                        <i className="fas fa-user"></i>
                    </div>
                    <p className={styles.messageText}>{history.lastMessage.user}</p>
                </div>
                <div className={styles.message}>
                    <div className={`${styles.messageIcon} ${styles.assistantIcon}`}>
                        <i className="fas fa-robot"></i>
                    </div>
                    <p className={styles.messageText}>{history.lastMessage.assistant}</p>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.timestamp}>{formatTimestamp(history.timestamp)}</span>
                <div className={styles.actions}>
                    <button className={styles.actionButton} title="继续对话">
                        <i className="fas fa-retweet"></i>
                    </button>
                    <button className={styles.actionButton} title="查看完整历史">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </button>
                    <button className={`${styles.actionButton} ${styles.deleteButton}`} title="删除">
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default HistoryCard;