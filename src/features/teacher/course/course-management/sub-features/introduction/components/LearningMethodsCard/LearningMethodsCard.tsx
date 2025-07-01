// src/components/teacher/course-management/introduction/LearningMethodsCard/LearningMethodsCard.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './LearningMethodsCard.module.css';

// 定义组件的 Props
interface LearningMethodsCardProps {
    title: string;
    intro: string;
    methods: string[];
}

// 定义容器和列表项的动画变体
const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // 子项依次入场
            delayChildren: 0.2,   // 容器出现后延迟0.2秒再开始子项动画
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

const LearningMethodsCard: React.FC<LearningMethodsCardProps> = ({ title, intro, methods }) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <p className={styles.methodsIntro}>{intro}</p>
            <motion.ul
                className={styles.methodsList}
                variants={listVariants}
                initial="hidden"
                whileInView="visible" // 当组件进入视口时触发动画
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
        </div>
    );
};

export default LearningMethodsCard;