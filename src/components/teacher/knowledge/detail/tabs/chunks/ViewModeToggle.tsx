"use client";
import React from 'react';
import styles from './ChunkToolbar.module.css'; // 复用样式
import Tooltip from '@/components/common/Tooltip/Tooltip';

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
                        <i className={icon}></i>
                    </button>
                </Tooltip>
            ))}
        </div>
    );
};

export default ViewModeToggle;