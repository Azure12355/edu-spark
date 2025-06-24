// src/components/common/Tooltip/Tooltip.tsx
"use client";
import React, { useState, ReactNode, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Tooltip.module.css';

interface TooltipProps {
    content: string;
    children: ReactNode;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    const showTooltip = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            // 计算 Tooltip 的理想位置
            const top = rect.top + window.scrollY - 38; // 38 是 Tooltip 高度 + 间距的一个估算值
            const left = rect.left + window.scrollX + rect.width / 2;
            setPosition({ top, left });
        }
        setIsVisible(true);
    };

    const hideTooltip = () => setIsVisible(false);

    // Portal 化的 Tooltip 内容
    const TooltipContent = () => {
        const [isMounted, setIsMounted] = useState(false);

        useEffect(() => {
            setIsMounted(true);
        }, []);

        if (!isMounted) return null;

        return ReactDOM.createPortal(
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className={styles.tooltipBox}
                        style={{
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                            transform: 'translateX(-50%)', // 保持水平居中
                        }}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>,
            document.body // 将 Tooltip 渲染到 body 的顶层
        );
    };

    return (
        <div
            ref={triggerRef}
            className={`${styles.tooltipWrapper} ${className || ''}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            <TooltipContent />
        </div>
    );
};

export default Tooltip;