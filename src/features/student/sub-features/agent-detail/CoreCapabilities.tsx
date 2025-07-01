"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './CoreCapabilities.module.css';
import { AgentDetail } from '@/shared/lib/data/agentDetailData';

interface CoreCapabilitiesProps {
    capabilities: AgentDetail['coreCapabilities'];
}

const containerVariants = {
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const CoreCapabilities: React.FC<CoreCapabilitiesProps> = ({ capabilities }) => {
    return (
        <div className={styles.wrapper}>
            <motion.div
                className={styles.container}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {capabilities.map((cap, index) => (
                    <motion.div
                        key={index}
                        className={styles.card}
                        style={{ '--glow-color': cap.color, '--glow-color-alpha': `${cap.color}20` } as React.CSSProperties}
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        {/* 渐变边框 */}
                        <motion.div className={styles.borderGlow} variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }}/>

                        <div className={styles.cardContent}>
                            <div className={styles.header}>
                                <div className={styles.icon} style={{ color: cap.color, backgroundColor: `${cap.color}1A`}}>
                                    <i className={cap.icon}></i>
                                </div>
                                {cap.tag && <span className={`${styles.tag} ${styles[cap.tag]}`}>{cap.tag}</span>}
                            </div>
                            <h3 className={styles.title}>{cap.title}</h3>
                            <p className={styles.description}>{cap.description}</p>
                            <div className={styles.footer}>
                                <span className={styles.usageCount}>
                                    <i className="fas fa-fire"></i> {cap.usageCount} 人使用
                                </span>
                                <motion.div className={styles.enterButton} variants={{ hover: { opacity: 1, x: 0 }, initial: { opacity: 0, x: -10 } }}>
                                    进入 <i className="fas fa-arrow-right"></i>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default CoreCapabilities;