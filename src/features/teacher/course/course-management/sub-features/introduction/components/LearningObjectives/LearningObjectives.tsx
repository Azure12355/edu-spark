"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './LearningObjectives.module.css';
// [!code focus start]
// 1. 从我们定义的领域类型中导入 LearningObjectiveItem
import { LearningObjectiveItem } from '../../types';
// [!code focus end]

// 2. 更新组件的 Props 接口
interface LearningObjectivesProps {
    // objectives 是一个可选的 LearningObjectiveItem 数组
    objectives?: LearningObjectiveItem[];
}

// 动画变体 (保持不变)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
};

// 3. 新增一个优雅的空状态组件
const EmptyState = () => (
    <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
            <i className="fas fa-bullseye"></i>
        </div>
        <p>暂未设定学习目标</p>
    </div>
);


const LearningObjectives: React.FC<LearningObjectivesProps> = ({ objectives }) => {
    // 4. 检查数据是否存在且不为空
    const hasObjectives = objectives && objectives.length > 0;

    // 辉光效果的鼠标移动处理 (保持不变)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const item = e.currentTarget;
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        item.style.setProperty('--mouse-x', `${x}px`);
        item.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.sectionTitle}>学习目标</h2>

            {/* 5. 根据数据是否存在进行条件渲染 */}
            {hasObjectives ? (
                <motion.div
                    className={styles.objectivesList}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {objectives.map((obj, index) => (
                        <motion.div
                            key={index}
                            className={styles.objectiveItem}
                            variants={itemVariants}
                            onMouseMove={handleMouseMove}
                        >
                            <div className={styles.objectiveIcon}>
                                <i className={obj.icon || 'fas fa-flag-checkered'}></i>
                            </div>
                            <div className={styles.objectiveText}>
                                <h4>{obj.title}</h4>
                                <p>{obj.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <EmptyState />
            )}
        </div>
    );
};

export default LearningObjectives;