// src/components/teacher/course-management/introduction/LearningObjectives/LearningObjectives.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './LearningObjectives.module.css';

// 定义单个学习目标的数据结构
export interface ObjectiveData {
    icon: string;
    title: string;
    description: string;
}

// 定义组件的 Props
interface LearningObjectivesProps {
    objectives: ObjectiveData[];
}

// 定义容器和子项的入场动画
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // 每个子项依次入场，间隔0.15秒
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

const LearningObjectives: React.FC<LearningObjectivesProps> = ({ objectives }) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.sectionTitle}>学习目标</h2>
            <motion.div
                className={styles.objectivesList}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible" // 当组件进入视口时触发动画
                viewport={{ once: true, amount: 0.3 }} // 动画只触发一次
            >
                {objectives.map((obj, index) => (
                    <motion.div key={index} className={styles.objectiveItem} variants={itemVariants}>
                        <div className={styles.objectiveIcon}>
                            <i className={obj.icon}></i>
                        </div>
                        <div className={styles.objectiveText}>
                            <h4>{obj.title}</h4>
                            <p>{obj.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default LearningObjectives;