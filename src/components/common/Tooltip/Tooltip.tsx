// src/components/common/Tooltip/Tooltip.tsx
"use client";
import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Tooltip.module.css';

interface TooltipProps {
    content: string;
    children: ReactNode;
    // 关键改动：添加 className prop
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className }) => {
    const [isVisible, setIsVisible] = useState(false);

    const showTooltip = () => setIsVisible(true);
    const hideTooltip = () => setIsVisible(false);

    return (
        <div
            // 关键改动：应用外部传入的 className
            className={`${styles.tooltipWrapper} ${className || ''}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className={styles.tooltipBox}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;