"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './KnowledgeBaseHeader.module.css';

// 数据定义
const stats = [
    { value: 46, label: "文档总数", icon: "fa-file-alt" },
    { value: "5.2k", label: "向量切片", icon: "fa-cubes" },
    { value: "120ms", label: "平均耗时", icon: "fa-tachometer-alt" },
    { value: "98%", label: "命中率", icon: "fa-bullseye" },
];

const quickActions = [
    { text: "导入文档", icon: "fa-upload", colorClass: styles.tagBlue },
    { text: "API文档", icon: "fa-code", colorClass: styles.tagGreen },
    { text: "价格说明", icon: "fa-tags", colorClass: styles.tagGray },
];

// 动画 Variants
const bannerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 120 }
    }
};


const KnowledgeBaseHeader = () => {
    return (
        <motion.div
            className={styles.banner}
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className={styles.contentWrapper}>
                <div className={styles.leftSection}>
                    <motion.h2 className={styles.title} variants={itemVariants}>
                        <i className="fas fa-brain"></i> 知识库中心
                    </motion.h2>
                    <motion.p className={styles.subtitle} variants={itemVariants}>
                        管理你的所有知识资产，为构建强大的课程 Agent 提供动力。上传、处理、检索，一切尽在掌握。
                    </motion.p>
                    <motion.button className={styles.mainCtaButton} variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <i className="fas fa-plus-circle"></i> 创建新知识库
                    </motion.button>
                    <motion.div className={styles.quickActions} variants={itemVariants}>
                        <label>快速开始:</label>
                        {quickActions.map(action => (
                            <button key={action.text} className={`${styles.quickActionTag} ${action.colorClass}`}>
                                <i className={`fas ${action.icon}`}></i> {action.text}
                            </button>
                        ))}
                    </motion.div>
                </div>

                <motion.div className={styles.rightSection} variants={itemVariants}>
                    <div className={styles.statsGrid}>
                        {stats.map(stat => (
                            <motion.div key={stat.label} className={styles.statCard} variants={itemVariants}>
                                <div className={styles.icon}><i className={`fas ${stat.icon}`}></i></div>
                                <div className={styles.value}>{stat.value}</div>
                                <div className={styles.label}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
export default KnowledgeBaseHeader;