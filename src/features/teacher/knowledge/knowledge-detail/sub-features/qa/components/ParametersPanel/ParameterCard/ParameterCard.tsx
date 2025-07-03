"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ParameterCard.module.css';

/**
 * @interface ParameterCardProps
 * @description 【最终版】Props 接口，组件完全受控。
 * @property {string} title - 卡片标题。
 * @property {React.ReactNode} children - 卡片内容。
 * @property {boolean} isOpen - 【受控】控制卡片是否展开的状态，由外部传入。
 * @property {() => void} onToggle - 【受控】当用户点击头部时触发的回调函数，通知父组件更新状态。
 */
interface ParameterCardProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

/**
 * 【最终版】可折叠的参数卡片组件
 * @description 一个完全受控的纯UI组件，负责展示一个可折叠的区域。
 */
const ParameterCard: React.FC<ParameterCardProps> = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className={styles.parameterCard}>
            {/* 点击头部时，调用从 props 传入的 onToggle 函数 */}
            <button className={styles.cardHeader} onClick={onToggle}>
                <div className={styles.cardTitle}>
                    <span className={styles.bar}></span>{title}
                </div>
                {/* 动画状态现在也完全由 isOpen prop 驱动 */}
                <motion.i
                    className={`fas fa-chevron-down ${styles.chevronIcon}`}
                    animate={{ rotate: isOpen ? 0 : -90 }}
                />
            </button>
            <AnimatePresence initial={false}>
                {/* 渲染子内容也完全由 isOpen prop 决定 */}
                {isOpen && (
                    <motion.div
                        className={styles.cardBody}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ParameterCard;