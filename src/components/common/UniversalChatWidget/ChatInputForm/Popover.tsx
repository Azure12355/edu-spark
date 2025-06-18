// src/components/common/UniversalChatWidget/ChatInputForm/Popover.tsx
"use client";

import React, { useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Popover.module.css';

interface PopoverProps {
    isOpen: boolean;
    onClose: () => void;
    trigger: ReactNode;
    children: ReactNode;
    position?: 'top' | 'bottom';
    align?: 'start' | 'center' | 'end'; // 新增对齐属性
    className?: string; // 允许外部传入 class
}

const Popover: React.FC<PopoverProps> = ({
                                             isOpen,
                                             onClose,
                                             trigger,
                                             children,
                                             position = 'top',
                                             align = 'start', // 默认为 start (左对齐)
                                             className,
                                         }) => {
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const popoverVariants = {
        hidden: { opacity: 0, y: position === 'top' ? 8 : -8, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: 'easeOut' } },
        exit: { opacity: 0, y: position === 'top' ? 8 : -8, scale: 0.95, transition: { duration: 0.1 } },
    };

    return (
        <div className={styles.popoverWrapper} ref={popoverRef}>
            {trigger}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`${styles.popoverContent} ${styles[position]} ${styles[align]} ${className || ''}`}
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