// src/components/common/ChatInputForm/Popover.tsx
"use client";

import React, { useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Popover.module.css';

interface PopoverProps {
    isOpen: boolean;
    onClose: () => void;
    trigger: ReactNode; // 触发 Popover 的元素
    children: ReactNode; // Popover 的内容
    position?: 'top' | 'bottom';
}

const Popover: React.FC<PopoverProps> = ({ isOpen, onClose, trigger, children, position = 'top' }) => {
    const popoverRef = useRef<HTMLDivElement>(null);

    // 点击外部区域关闭 Popover
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const popoverVariants = {
        hidden: { opacity: 0, y: position === 'top' ? 10 : -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
        exit: { opacity: 0, y: position === 'top' ? 10 : -10, scale: 0.95, transition: { duration: 0.15 } },
    };

    return (
        <div className={styles.popoverWrapper} ref={popoverRef}>
            {trigger}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`${styles.popoverContent} ${styles[position]}`}
                        variants={popoverVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Popover;