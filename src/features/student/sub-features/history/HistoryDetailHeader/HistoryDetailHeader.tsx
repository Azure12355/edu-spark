"use client";
import React from 'react';
import Link from 'next/link';
import styles from './HistoryDetailHeader.module.css';
import { Agent } from '@/shared/lib/data/agentData';

interface HistoryDetailHeaderProps {
    agent: Agent;
}

const HistoryDetailHeader: React.FC<HistoryDetailHeaderProps> = ({ agent }) => {
    return (
        <div className={styles.header}>
            <div className={styles.agentDetails}>
                <div className={styles.avatar} style={{ background: agent.avatarGradient }}>
                    {agent.avatarText}
                </div>
                <div className={styles.textInfo}>
                    <h2>{agent.name}</h2>
                    <p>由 {agent.creator} 创建 · 使用 {agent.model} 模型</p>
                    <div className={styles.tags}>
                        {agent.skills.map(skill => (
                            <span key={skill} className={styles.tag}>{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.headerActions}>
                <Link href="/student/history">
                    <button className={styles.backButton}>返回列表</button>
                </Link>
                <button className={styles.continueButton}>
                    <i className="fas fa-play"></i> 继续对话
                </button>
            </div>
        </div>
    );
};

export default HistoryDetailHeader;