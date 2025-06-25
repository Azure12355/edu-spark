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
    position?: 'top' | 'right'; // 新增 position prop
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className, position = 'top' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    const showTooltip = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            let top = 0, left = 0;

            if (position === 'top') {
                top = rect.top + window.scrollY - 38; // 估算值
                left = rect.left + window.scrollX + rect.width / 2;
            } else { // 'right'
                top = rect.top + window.scrollY + rect.height / 2;
                left = rect.right + window.scrollX + 8; // 8px 间距
            }

            setCoords({ top, left });
        }
        setIsVisible(true);
    };

    const hideTooltip = () => setIsVisible(false);

    const TooltipContent = () => {
        const [isMounted, setIsMounted] = useState(false);
        useEffect(() => { setIsMounted(true); }, []);
        if (!isMounted) return null;

        const motionProps = {
            initial: { opacity: 0, x: position === 'right' ? -5 : 0, y: position === 'top' ? 5 : 0 },
            animate: { opacity: 1, x: 0, y: 0 },
            exit: { opacity: 0, x: position === 'right' ? -5 : 0, y: position === 'top' ? 5 : 0 },
            transition: { duration: 0.2 }
        };

        const style: React.CSSProperties = {
            top: `${coords.top}px`,
            left: `${coords.left}px`,
        };
        if (position === 'top') {
            style.transform = 'translateX(-50%)';
        } else {
            style.transform = 'translateY(-50%)';
        }

        return ReactDOM.createPortal(
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className={`${styles.tooltipBox} ${styles[position]}`}
                        style={style}
                        {...motionProps}
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>,
            document.body
        );
    };

    return (
        <div ref={triggerRef} className={className} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            <TooltipContent />
        </div>
    );
};

export default Tooltip;