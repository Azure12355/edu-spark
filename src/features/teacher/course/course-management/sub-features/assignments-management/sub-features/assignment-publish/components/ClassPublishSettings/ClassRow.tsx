// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-publish/components/ClassPublishSettings/ClassRow.tsx]
"use client";

import React from 'react';
import styles from './ClassRow.module.css';
import { ClassPublishConfig } from '../../hooks/useAssignmentPublish';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

interface ClassRowProps {
    config: ClassPublishConfig;
    onConfigChange: (classId: number, newConfig: Partial<ClassPublishConfig>) => void;
}

const ClassRow: React.FC<ClassRowProps> = ({ config, onConfigChange }) => {
    const { classId, className, isSelected, publishAt, startAt, dueAt, error } = config;

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onConfigChange(classId, { [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onConfigChange(classId, { isSelected: e.target.checked });
    };

    // 将 ISO 字符串转换为 "yyyy-MM-ddThh:mm" 格式以适配 datetime-local input
    const formatDateTimeLocal = (isoString?: string): string => {
        if (!isoString) return '';
        try {
            return new Date(isoString).toISOString().slice(0, 16);
        } catch (e) {
            return '';
        }
    };

    return (
        <div className={`${styles.rowContainer} ${!isSelected ? styles.disabled : ''} ${error ? styles.errorRow : ''}`}>
            <div className={styles.selectionCell}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                />
            </div>
            <div className={styles.classInfoCell}>
                <span className={styles.className}>{className}</span>
            </div>
            <div className={styles.dateCell}>
                <input
                    type="datetime-local"
                    name="startAt"
                    value={formatDateTimeLocal(startAt)}
                    onChange={handleDateChange}
                    className={styles.dateInput}
                    disabled={!isSelected}
                />
            </div>
            <div className={styles.dateCell}>
                <input
                    type="datetime-local"
                    name="dueAt"
                    value={formatDateTimeLocal(dueAt)}
                    onChange={handleDateChange}
                    className={styles.dateInput}
                    disabled={!isSelected}
                />
            </div>
            <div className={styles.configCell}>
                <Tooltip content="高级设置（如防作弊、允许迟交等）" position="top">
                    <button className={styles.configButton} disabled={!isSelected}>
                        <i className="fas fa-cog"></i>
                    </button>
                </Tooltip>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export default ClassRow;