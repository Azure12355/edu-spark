"use client";
import React from 'react';
import styles from './HotAgents.module.css';

const hotAgentsData = [
    { rank: 1, name: 'AI 绘画 Prompt 生成器', users: '15k+' },
    { rank: 2, name: 'Java 面试通关宝典', users: '10k+' },
    { rank: 3, name: '考研政治全程陪跑', users: '8.9k' },
];

const HotAgents = () => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>本周热门 Agent</h3>
                <a href="#" className={styles.viewAll}>完整榜单 {'>'}</a>
            </div>
            <div className={styles.agentList}>
                {hotAgentsData.map(agent => (
                    <div key={agent.rank} className={styles.agentItem}>
                        <span className={`${styles.rankNumber} ${styles[`rank${agent.rank}`]}`}>{agent.rank}</span>
                        <span className={styles.agentName}>{agent.name}</span>
                        <span className={styles.userCount}><i className="fas fa-fire"></i> {agent.users}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotAgents;