"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './LearningMethodsCard.module.css';

// 1. 定义组件的 Props 接口
interface LearningMethodsCardProps {
    title: string;
    intro: string;
    // [!code focus start]
    // learningMethods 是一个可选的字符串数组，与 CourseDetail 实体对应
    methods?: string[];
    // [!code focus end]
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
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 250, damping: 25 }
    },
};

// [!code start]
// 2. 新增一个优雅的空状态组件
const EmptyState = () => (
    <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
            <i className="fas fa-chalkboard-teacher"></i>
        </div>
        <p>暂未设置学习方法</p>
    </div>
);
// [!code end]

const LearningMethodsCard: React.FC<LearningMethodsCardProps> = ({ title, intro, methods }) => {
    // 3. 检查数据是否存在且不为空
    const hasMethods = methods && methods.length > 0;

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' }}
        >
            <h2 className={styles.sectionTitle}>{title}</h2>
            <p className={styles.methodsIntro}>{intro}</p>

            {/* 4. 根据数据是否存在进行条件渲染 */}
            {hasMethods ? (
                <motion.ul
                    className={styles.methodsList}
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    {methods.map((method, index) => (
                        <motion.li key={index} className={styles.methodItem} variants={itemVariants}>
                            <div className={styles.checkIcon}>
                                <i className="fas fa-check"></i>
                            </div>
                            <span>{method}</span>
                        </motion.li>
                    ))}
                </motion.ul>
            ) : (
                <EmptyState />
            )}
        </motion.div>
    );
};

export default LearningMethodsCard;