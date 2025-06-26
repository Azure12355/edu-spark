// src/components/teacher/course-management/introduction/ToolsAndResourcesCard/ToolsAndResourcesCard.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ToolsAndResourcesCard.module.css';

// 定义数据结构
export interface TechStackItem {
    name: string;
    icon: string;
    color: string;
}

export interface OnlineResourceItem {
    name: string;
    url: string;
}

// 定义组件 Props
interface ToolsAndResourcesCardProps {
    techStack: TechStackItem[];
    onlineResources: OnlineResourceItem[];
}

// 定义动画变体
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
    return (
        <div className={styles.card}>
            {/* 技术栈部分 */}
            <div>
                <h2 className={styles.sectionTitle}>技术栈与工具</h2>
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
            </div>

            {/* 在线资源部分 */}
            <div className={styles.resourcesSection}>
                <h2 className={styles.sectionTitle}>在线资源</h2>
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
            </div>
        </div>
    );
};

export default ToolsAndResourcesCard;