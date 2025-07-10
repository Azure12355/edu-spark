// [!code focus start ++]
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, RotateCcw } from 'lucide-react';
import { useToast } from '@/shared/hooks/useToast';
import styles from './CreativeCard.module.css';

// 定义卡片的数据结构
export interface CreativeCardData {
    id: string;
    type: 'concept' | 'formula' | 'code';
    title: string;          // 例如：'闭包', '薛定谔方程', '快速排序'
    subtitle?: string;      // 例如：'JavaScript', '量子物理', 'Python'
    content: string;        // 卡片的主要内容（公式、代码或概念解释）
    theme: 'sky' | 'meadow' | 'lilac' | 'ember' | 'sakura' | 'mint' |
        'graphite' | 'coral' | 'lemon' | 'iris' | 'olive' | 'indigo' | 'rose' | 'sea'
    ; // 预设主题
    icon: React.ReactNode;  // 例如：<FlaskConical size={...} />
}

interface CreativeCardProps {
    card: CreativeCardData;
}

const CreativeCard: React.FC<CreativeCardProps> = ({ card }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const showToast = useToast();

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation(); // 阻止事件冒泡，防止点击复制时触发翻转
        const copyText = card.type === 'formula' ? card.content.replace(/\s+/g, '') : card.content;
        navigator.clipboard.writeText(copyText).then(() => {
            setIsCopied(true);
            showToast({ message: `${card.type === 'formula' ? '公式' : '代码'}已复制`, type: 'success' });
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    const handleFlip = () => {
        if (card.type === 'concept') {
            setIsFlipped(!isFlipped);
        }
    };

    // 概念卡片渲染
    const renderConceptCard = () => (
        <div className={styles.flipCard} onClick={handleFlip}>
            <motion.div
                className={styles.flipCardInner}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {/* 卡片正面 */}
                <div className={styles.flipCardFront}>
                    <div className={styles.conceptIconWrapper}>{card.icon}</div>
                    <h3 className={styles.conceptTitle}>{card.title}</h3>
                    <p className={styles.conceptSubtitle}>{card.subtitle}</p>
                </div>
                {/* 卡片背面 */}
                <div className={styles.flipCardBack}>
                    <div className={styles.backHeader}>
                        <h4 className={styles.backTitle}>{card.title}</h4>
                        <button className={styles.flipBackButton} title="返回">
                            <RotateCcw size={16} />
                        </button>
                    </div>
                    <p className={styles.backContent}>{card.content}</p>
                </div>
            </motion.div>
        </div>
    );

    // 公式或代码卡片渲染
    const renderSnippetCard = () => (
        <div className={styles.snippetContent}>
            <div className={styles.snippetHeader}>
                <div className={styles.snippetTitleWrapper}>
                    {card.icon}
                    <span>{card.title}</span>
                </div>
                <button onClick={handleCopy} className={styles.copyButton}>
                    <Copy size={14} /> {isCopied ? '已复制' : '复制'}
                </button>
            </div>
            <pre className={styles.snippetPre}>
                {/* KaTeX 等渲染器应在此处处理 card.content */}
                <code className={card.type === 'code' ? 'language-python' : ''}>
                    {card.content}
                </code>
            </pre>
        </div>
    );

    return (
        <motion.div
            className={`${styles.cardWrapper} ${styles[card.type]} ${styles[card.theme]}`}
            whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {card.type === 'concept' ? renderConceptCard() : renderSnippetCard()}
        </motion.div>
    );
};

export default CreativeCard;
// [code focus end ++]