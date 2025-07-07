"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ToolsAndResourcesCard.module.css';
import {OnlineResourceItem, TechStackItem} from "@/shared/types";


// 2. 更新组件的 Props 接口
interface ToolsAndResourcesCardProps {
    techStack?: TechStackItem[];
    onlineResources?: OnlineResourceItem[];
}

// 动画变体 (保持不变)
const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
};


const ToolsAndResourcesCard: React.FC<ToolsAndResourcesCardProps> = ({ techStack, onlineResources }) => {
    // 3. 分别检查两部分数据是否存在且不为空
    const hasTechStack = techStack && techStack.length > 0;
    const hasOnlineResources = onlineResources && onlineResources.length > 0;

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' }}
        >
            {/* --- 技术栈部分 --- */}
            <div>
                <h2 className={styles.sectionTitle}>技术栈与工具</h2>
                {hasTechStack ? (
                    <motion.div
                        className={styles.toolsGrid}
                        variants={listVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        {techStack.map(tool => (
                            <motion.div key={tool.name} className={styles.toolItem} variants={itemVariants}>
                                <i className={tool.icon} style={{ color: tool.color }}></i>
                                <span>{tool.name}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <p className={styles.emptyText}>暂未指定技术栈。</p>
                )}
            </div>

            {/* --- 在线资源部分 --- */}
            <div className={styles.resourcesSection}>
                <h2 className={styles.sectionTitle}>在线资源</h2>
                {hasOnlineResources ? (
                    <motion.div
                        className={styles.onlineResourcesList}
                        variants={listVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        {onlineResources.map(res => (
                            <motion.a
                                key={res.name}
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.onlineResourceItem}
                                variants={itemVariants}
                            >
                                {res.name}
                                <i className="fas fa-external-link-alt"></i>
                            </motion.a>
                        ))}
                    </motion.div>
                ) : (
                    <p className={styles.emptyText}>暂未提供在线资源。</p>
                )}
            </div>
        </motion.div>
    );
};

export default ToolsAndResourcesCard;