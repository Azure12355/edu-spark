// src/components/common/WelcomeScreen.tsx
"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './WelcomeScreen.module.css';
import PromptCard, { PromptCardData } from '@/components/common/UniversalChatWidget/PromptCard/PromptCard';

// 定义 WelcomeScreen 的 props 接口
interface WelcomeScreenProps {
    avatar: React.ReactNode;
    title: string;
    subtitle: string;
    promptCards: PromptCardData[];
    onCardClick: (card: PromptCardData) => void;
    className?: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
                                                         avatar,
                                                         title,
                                                         subtitle,
                                                         promptCards,
                                                         onCardClick,
                                                         className
                                                     }) => {
    const welcomeContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!welcomeContainerRef.current) return;
        const rect = welcomeContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        welcomeContainerRef.current.style.setProperty('--mouse-x', `${x}px`);
        welcomeContainerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <motion.div
            ref={welcomeContainerRef}
            className={`${styles.welcomeContainer} ${className || ''}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onMouseMove={handleMouseMove}
        >
            <div className={styles.auroraBackground}></div>
            <motion.div className={styles.header} variants={headerVariants}>
                <div className={styles.avatarWrapper}>
                    {avatar}
                </div>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
            </motion.div>
            <motion.div
                className={styles.promptsGrid}
                variants={containerVariants}
            >
                {promptCards.map((card) => (
                    <PromptCard
                        key={card.id}
                        cardData={card}
                        onClick={onCardClick}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default WelcomeScreen;