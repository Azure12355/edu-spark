"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './AssistantWelcomeScreen.module.css';
import PromptCard from '../PromptCard/PromptCard';

interface AssistantWelcomeScreenProps {
    onPromptClick: (promptText: string) => void;
}

const samplePrompts = [
    {
        iconClass: 'fas fa-laptop-code',
        title: '计算机科学',
        description: '用 Python语言 编写一个绘制爱心的代码，并解释说明。',
    },
    {
        iconClass: 'fas fa-landmark',
        title: '人文历史',
        description: '比较分析一下古希腊哲学中，柏拉图和亚里士多德在“理念论”上的核心分歧。',
    },
    {
        iconClass: 'fas fa-atom',
        title: '数理科学',
        description: '请推导牛顿第二定律 (F=ma) 在变质量系统中的表达式。',
    },
    {
        iconClass: 'fas fa-chart-pie',
        title: '商业经济',
        description: '为一家新开的咖啡店，设计一个为期三个月的市场营销策略，包含线上和线下活动。',
    },
    {
        iconClass: 'fas fa-palette',
        title: '艺术设计',
        description: '我正在设计一个科技主题的 APP，请给我推荐一组包含主色、辅色和点缀色的配色方案。',
    },
    {
        iconClass: 'fas fa-gavel',
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
    // --- 核心新增：用于获取容器DOM和处理鼠标移动 ---
    const welcomeContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!welcomeContainerRef.current) return;
        const rect = welcomeContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        welcomeContainerRef.current.style.setProperty('--mouse-x', `${x}px`);
        welcomeContainerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    // --- 结束新增 ---

    return (
        <motion.div
            ref={welcomeContainerRef}
            className={styles.welcomeContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onMouseMove={handleMouseMove} // --- 核心新增：绑定事件 ---
        >
            {/* 新增一个 div 用于放置固定的背景光晕，不随鼠标移动 */}
            <div className={styles.auroraBackground}></div>

            <motion.div className={styles.header} variants={headerVariants}>
                <Image
                    src="/robot.gif"
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