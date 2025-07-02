// src/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/toolbar-parts/ViewModeToggle.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
// [!code focus start]
// 导入新的、专属的样式文件
import styles from '../../styles/ViewModeToggle.module.css';
// [!code focus end]

// 类型定义保持不变
export type ViewMode = 'grid' | 'list';

const VIEW_MODES: { id: ViewMode; icon: string; label: string }[] = [
    { id: 'grid', icon: 'fas fa-th-large', label: '网格视图' },
    { id: 'list', icon: 'fas fa-list', label: '列表视图' },
];

interface ViewModeToggleProps {
    currentMode: ViewMode;
    onModeChange: (mode: ViewMode) => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ currentMode, onModeChange }) => {
    return (
        <div className={styles.viewToggle} role="radiogroup" aria-label="视图模式切换">
            {VIEW_MODES.map(({ id, icon, label }) => (
                <Tooltip content={label} key={id}>
                    <button
                        className={`${styles.toggleButton} ${currentMode === id ? styles.active : ''}`}
                        onClick={() => onModeChange(id)}
                        aria-label={label}
                        aria-checked={currentMode === id}
                        role="radio"
                    >
                        {/* 当按钮激活时，渲染动态背景滑块 */}
                        {currentMode === id && (
                            <motion.div
                                className={styles.activePill}
                                layoutId="activeViewModePill" // 关键：为布局动画提供唯一ID
                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            />
                        )}
                        <i className={icon}></i>
                    </button>
                </Tooltip>
            ))}
        </div>
    );
};

export default ViewModeToggle;