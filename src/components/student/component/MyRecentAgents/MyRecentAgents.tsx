"use client";
import React from 'react';
import styles from './MyRecentAgents.module.css';
import Image from "next/image";

const recentAgents = [
    { id: 1, name: 'Python 高级编程助教', avatar: 'https://via.placeholder.com/32?text=P' },
    { id: 2, name: 'Java 面试通关宝典', avatar: 'https://via.placeholder.com/32?text=J' },
    { id: 3, name: 'UI/UX 设计灵感助手', avatar: 'https://via.placeholder.com/32?text=UI' },
];

const MyRecentAgents = () => {
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>
                最近使用
            </h3>
            <div className={styles.agentList}>
                {recentAgents.map(agent => (
                    <div key={agent.id} className={styles.agentItem}>
                        <Image src={agent.avatar} alt={agent.name} width={32} height={32} className={styles.agentAvatar} />
                        <span className={styles.agentName}>{agent.name}</span>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                ))}
            </div>
            <button className={styles.viewAllButton}>
                查看全部
            </button>
        </div>
    );
};

export default MyRecentAgents;