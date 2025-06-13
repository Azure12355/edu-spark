"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './AgentDetailHeader.module.css';
import { AgentDetail } from '@/lib/data/agentDetailData';

interface HeaderProps {
    agent: AgentDetail;
}

const AgentDetailHeader: React.FC<HeaderProps> = ({ agent }) => {
    return (
        <div className={styles.heroSection}>
            <div className={styles.backgroundGlows}>
                <div className={styles.glow1}></div>
                <div className={styles.glow2}></div>
            </div>
            <div className={styles.contentWrapper}>
                {/* --- 左侧：核心信息 --- */}
                <motion.div
                    className={styles.leftPanel}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className={styles.category}>{agent.category}</div>
                    <h1 className={styles.agentName}>{agent.name}</h1>
                    <p className={styles.description}>{agent.description}</p>
                    <div className={styles.tags}>
                        {agent.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                    </div>
                    <div className={styles.mainActions}>
                        <button className={styles.ctaButton}>
                            <i className="fas fa-play"></i> 进入对话
                        </button>
                        <button className={styles.infoButton} title="更多信息">
                            <i className="fas fa-info"></i>
                        </button>
                    </div>
                </motion.div>

                {/* --- 右侧：功能亮点 --- */}
                <motion.div
                    className={styles.rightPanel}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                >
                    <div className={styles.featureCard}>
                        <div className={styles.featureCardHeader}>
                            {/* <Image src="/images/student-dashboard/trophy.png" alt="Trophy" width={40} height={40}/> */}
                            <h4><i className="fas fa-star" style={{color: '#f59e0b'}}></i> 核心亮点</h4>
                        </div>
                        <ul className={styles.featureList}>
                            {agent.keyFeatures.map(feature => (
                                <li key={feature.title}>
                                    <i className={feature.icon || 'fas fa-check-circle'}></i>
                                    <span>{feature.title}</span>
                                    {feature.isNew && <span className={styles.newBadge}>NEW</span>}
                                </li>
                            ))}
                        </ul>
                        <button className={styles.secondaryCtaButton}>
                            立即免费使用 <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </motion.div>

                {/* --- 所有者操作按钮 --- */}
                {agent.isOwnedByCurrentUser && (
                    <motion.div
                        className={styles.ownerActions}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <button className={styles.editButton}><i className="fas fa-edit"></i> 修改智能体</button>
                        <button className={styles.deleteButton}><i className="fas fa-trash-alt"></i> 删除</button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AgentDetailHeader;