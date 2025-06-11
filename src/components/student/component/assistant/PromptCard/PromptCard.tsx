// src/components/student/component/assistant/PromptCard.tsx
"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './PromptCard.module.css';

interface PromptCardProps {
    iconClass: string;
    title: string;
    description: string;
    onClick: () => void;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const PromptCard: React.FC<PromptCardProps> = ({ iconClass, title, description, onClick }) => {
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
            onClick={onClick}
            onMouseMove={handleMouseMove}
        >
            <div className={styles.cardIcon}>
                <i className={iconClass}></i>
            </div>
            <h4 className={styles.cardTitle}>{title}</h4>
            <p className={styles.cardDescription}>{description}</p>
        </motion.div>
    );
};

export default PromptCard;