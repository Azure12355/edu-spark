"use client";

import React, { useMemo, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import styles from './KnowledgeBaseHeader.module.css';

// BrainCircuitIcon SVG 组件保持不变
const BrainCircuitIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2"/>
        <path d="M12 21c-4.247 0-7.85-2.9-9.15-6.85a9.98 9.98 0 0118.3 0C19.85 18.1 16.247 21 12 21zM16 12a1 1 0 11-2 0 1 1 0 012 0zM12 12a1 1 0 11-2 0 1 1 0 012 0zM8 12a1 1 0 11-2 0 1 1 0 012 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <motion.path
            d="M9 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM15 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM9 14.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM15 14.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM11.5 7v10M12.5 7v10M9 7h6M9 17h6"
            stroke="url(#brain-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
        />
        <defs>
            <linearGradient id="brain-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8"/>
                <stop offset="100%" stopColor="#4f46e5"/>
            </linearGradient>
        </defs>
    </svg>
);


const KnowledgeBaseHeader = () => {
    const knowledgeBases = useKnowledgeStore(state => state.knowledgeBases);
    const documents = useKnowledgeStore(state => state.documents);

    const stats = useMemo(() => {
        // 【修复1】: 增加对 documents 对象的空值检查
        const totalDocs = documents ? Object.values(documents).flat().length : 0;

        // 【核心修复】:
        // 1. 使用正确的属性名 kb.metadataStats
        // 2. 使用可选链 `?.` 和空值合并 `??` 来安全地访问嵌套属性
        const totalSlices = knowledgeBases.reduce((acc, kb) => {
            const sliceCount = kb.metadataStats?.slice_count ?? 0;
            return acc + sliceCount;
        }, 0);

        return {
            kbCount: knowledgeBases.length,
            docCount: totalDocs,
            sliceCount: totalSlices,
        };
    }, [knowledgeBases, documents]);

    // Framer Motion 动画相关的 Hooks (保持不变)
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const bgX = useTransform(mouseX, [0, 500], ['-20%', '20%']);
    const bgY = useTransform(mouseY, [0, 200], ['-20%', '20%']);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <motion.div
            ref={containerRef}
            className={styles.banner}
            onMouseMove={handleMouseMove}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className={styles.aurora} style={{ backgroundPositionX: bgX, backgroundPositionY: bgY }} />
            <div className={styles.gridPattern} />

            <div className={styles.contentWrapper}>
                <div className={styles.leftSection}>
                    <motion.div className={styles.titleGroup} variants={itemVariants}>
                        <div className={styles.titleIcon}>
                            <BrainCircuitIcon />
                        </div>
                        <h2 className={styles.title}>知识库中心</h2>
                    </motion.div>
                    <motion.p className={styles.subtitle} variants={itemVariants}>
                        在这里，您可以构建、管理并共享您的教学知识资产，为强大的 AI 助教提供动力。
                    </motion.p>
                    <motion.div className={styles.quickActions} variants={itemVariants}>
                        <button className={`${styles.actionButton} ${styles.primary}`}>
                            <i className="fas fa-plus"></i> 创建知识库
                        </button>
                        <button className={styles.actionButton}>
                            <i className="fas fa-share-alt"></i> 共享广场
                        </button>
                    </motion.div>
                </div>

                <div className={styles.rightSection}>
                    <motion.div className={styles.statCard} variants={itemVariants}>
                        <span className={styles.statValue}>{stats.kbCount}</span>
                        <span className={styles.statLabel}>知识库总数</span>
                    </motion.div>
                    <motion.div className={styles.statCard} variants={itemVariants}>
                        <span className={styles.statValue}>{stats.docCount}</span>
                        <span className={styles.statLabel}>文档总数</span>
                    </motion.div>
                    <motion.div className={styles.statCard} variants={itemVariants}>
                        <span className={styles.statValue}>{stats.sliceCount.toLocaleString()}</span>
                        <span className={styles.statLabel}>切片总数</span>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};
export default KnowledgeBaseHeader;