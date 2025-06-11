// src/components/student/component/assistant/AssistantWelcomeScreen.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './AssistantWelcomeScreen.module.css';
import PromptCard from '../PromptCard/PromptCard';

interface AssistantWelcomeScreenProps {
    onPromptClick: (promptText: string) => void;
}

const samplePrompts = [
    {
        iconClass: 'fas fa-laptop-code', // 计算机科学
        title: '计算机科学',
        description: '用 Java 实现一个单例模式，并解释其优缺点。',
    },
    {
        iconClass: 'fas fa-landmark', // 文史哲
        title: '人文历史',
        description: '比较分析一下古希腊哲学中，柏拉图和亚里士多德在“理念论”上的核心分歧。',
    },
    {
        iconClass: 'fas fa-atom', // 数理科学
        title: '数理科学',
        description: '请推导牛顿第二定律 (F=ma) 在变质量系统中的表达式。',
    },
    {
        iconClass: 'fas fa-chart-pie', // 经管
        title: '商业经济',
        description: '为一家新开的咖啡店，设计一个为期三个月的市场营销策略，包含线上和线下活动。',
    },
    {
        iconClass: 'fas fa-palette', // 艺术设计
        title: '艺术设计',
        description: '我正在设计一个科技主题的 APP，请给我推荐一组包含主色、辅色和点缀色的配色方案。',
    },
    {
        iconClass: 'fas fa-gavel', // 法学
        title: '法学',
        description: '解释一下“正当防卫”的构成要件，并举一个不适用正当防卫的例子。',
    },
];
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const AssistantWelcomeScreen: React.FC<AssistantWelcomeScreenProps> = ({ onPromptClick }) => {
    return (
        <motion.div
            className={styles.welcomeContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className={styles.header} variants={headerVariants}>
                <Image
                    src="/images/Chat/robot.png"
                    alt="Agent 助教"
                    width={80}
                    height={80}
                    className={styles.avatar}
                    priority
                />
                <h2 className={styles.title}>我是您的专属 AI 助教</h2>
                <p className={styles.subtitle}>
                    无论是概念辨析、代码编写，还是创意 brainstorm，我都能助您一臂之力。您可以直接提问，或从下面的卡片开始。
                </p>
            </motion.div>
            <motion.div
                className={styles.promptsGrid}
                variants={containerVariants}
            >
                {samplePrompts.map((prompt, index) => (
                    <PromptCard
                        key={index}
                        iconClass={prompt.iconClass}
                        title={prompt.title}
                        description={prompt.description}
                        onClick={() => onPromptClick(prompt.description)}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default AssistantWelcomeScreen;