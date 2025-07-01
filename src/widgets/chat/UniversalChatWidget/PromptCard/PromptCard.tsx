// src/components/common/PromptCard/PromptCard.tsx
"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './PromptCard.module.css';

// 定义更通用的 props 接口
export interface PromptCardData {
    id: string; // 增加唯一id，便于处理点击事件
    icon: React.ReactNode; // 使用 ReactNode 支持更丰富的图标
    title: string;
    description: string;
}

interface PromptCardProps {
    cardData: PromptCardData;
    onClick: (card: PromptCardData) => void; // 回调传递整个卡片数据
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const PromptCard: React.FC<PromptCardProps> = ({ cardData, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cardRef.current.style.setProperty('--mouse-x', `${x}px`);
            cardRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    return (
        <motion.div
            ref={cardRef}
            className={styles.promptCard}
            variants={cardVariants}
            onClick={() => onClick(cardData)}
            onMouseMove={handleMouseMove}
        >
            <div className={styles.cardIcon}>
                {cardData.icon}
            </div>
            <h4 className={styles.cardTitle}>{cardData.title}</h4>
            <p className={styles.cardDescription}>{cardData.description}</p>
        </motion.div>
    );
};

export default PromptCard;