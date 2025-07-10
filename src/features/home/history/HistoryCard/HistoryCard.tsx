"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './HistoryCard.module.css';
import { agentData } from '@/shared/lib/data/agentData';
import { HistoryEntry } from '@/shared/lib/data/historyData';
import Link from 'next/link';

interface HistoryCardProps {
    history: HistoryEntry;
    index: number;
}

// 格式化时间戳函数保持不变
const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = (now.getTime() - date.getTime()) / 1000;

    if (diffInSeconds < 60) return "刚刚";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分钟前`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}小时前`;

    return date.toLocaleDateString('zh-CN', { year: '2-digit', month: '2-digit', day: '2-digit' });
};

// 调色板的颜色定义
const paletteColors = {
    sky: { glow: 'rgba(0, 119, 182, 0.15)', tagBg: 'rgba(0, 119, 182, 0.1)', tagText: '#0077B6' },
    sunset: { glow: 'rgba(255, 69, 0, 0.15)', tagBg: 'rgba(255, 69, 0, 0.1)', tagText: '#D93D00' },
    lilac: { glow: 'rgba(147, 112, 219, 0.15)', tagBg: 'rgba(147, 112, 219, 0.1)', tagText: '#8A2BE2' },
    sandstone: { glow: 'rgba(210, 105, 30, 0.15)', tagBg: 'rgba(210, 105, 30, 0.1)', tagText: '#A0522D' },
    ocean: { glow: 'rgba(25, 25, 112, 0.15)', tagBg: 'rgba(25, 25, 112, 0.1)', tagText: '#191970' },
    meadow: { glow: 'rgba(34, 139, 34, 0.15)', tagBg: 'rgba(34, 139, 34, 0.1)', tagText: '#228B22' },
    // 添加默认备用颜色
    default: { glow: 'rgba(47, 123, 255, 0.15)', tagBg: 'rgba(47, 123, 255, 0.1)', tagText: '#2F7BFF' }
};

const HistoryCard: React.FC<HistoryCardProps> = ({ history, index }) => {
    const agent = agentData.find(a => a.id === history.agentId);

    if (!agent) return null;

    const colors = paletteColors[agent.palette as keyof typeof paletteColors] || paletteColors.default;

    const cardStyle = {
        '--glow-color': colors.glow,
        '--tag-bg-color': colors.tagBg,
        '--tag-text-color': colors.tagText,
        '--agent-avatar-gradient': agent.avatarGradient
    } as React.CSSProperties;

    return (
        <motion.div
            className={styles.card}
            style={cardStyle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
        >
            {history.isPinned && (
                <div className={styles.pinIcon} title="已置顶">
                    <i className="fas fa-thumbtack"></i>
                </div>
            )}

            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <div className={styles.avatar} style={{ background: agent.avatarGradient }}>
                        {agent.avatarText}
                    </div>
                    <div className={styles.agentInfo}>
                        <h4>{agent.name}</h4>
                        <div className={styles.agentTags}>
                            {agent.skills.slice(0, 2).map(skill => (
                                <span key={skill} className={styles.tag}>{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.conversationLog}>
                    {history.conversation.map((msg, msgIndex) => (
                        <div key={msgIndex} className={styles.message}>
                            <div className={`${styles.messageIcon} ${msg.role === 'user' ? styles.userIcon : styles.assistantIcon}`}>
                                <i className={`fas ${msg.role === 'user' ? 'fa-user' : 'fa-robot'}`}></i>
                            </div>
                            <p className={styles.messageText}>{msg.content}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.cardFooter}>
                    <span className={styles.timestamp}>
                        <i className="far fa-clock"></i>
                        {formatTimestamp(history.timestamp)}
                    </span>
                    <div className={styles.actions}>
                        <button className={styles.actionButton} title="继续对话">
                            <i className="fas fa-retweet"></i>
                        </button>
                        <Link href={`/history/${history.id}`} passHref>
                            <button
                                className={styles.actionButton}
                                title="查看完整历史"
                                onClick={(e) => e.stopPropagation()} // 阻止事件冒泡到卡片
                            >
                                <i className="fas fa-expand-arrows-alt"></i>
                            </button>
                        </Link>
                        <button className={`${styles.actionButton} ${styles.deleteButton}`} title="删除">
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HistoryCard;