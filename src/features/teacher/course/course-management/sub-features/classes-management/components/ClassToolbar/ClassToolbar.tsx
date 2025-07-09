// [!file src/features/teacher/course/course-management/sub-features/classes-management/components/ClassToolbar/ClassToolbar.tsx]
"use client";

import React from 'react';
import styles from './ClassToolbar.module.css';
import { ClassStatusEnum } from '@/shared/types/enums/course/ClassStatusEnum';
import { ClassAccessLevelEnum } from '@/shared/types/enums/course/ClassAccessLevelEnum';
import { ClassMonetizationTypeEnum } from '@/shared/types/enums/course/ClassMonetizationTypeEnum';

// 定义传入的 Props 类型
interface ClassToolbarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onFilterChange: (filters: { status?: string; accessLevel?: string; monetizationType?: string; }) => void;
    onCreateClass: () => void;
}

// 定义筛选器选项
const statusOptions = [
    { value: '', label: '所有状态' },
    { value: ClassStatusEnum.PREPARING, label: '准备中' },
    { value: ClassStatusEnum.ONGOING, label: '进行中' },
    { value: ClassStatusEnum.FINISHED, label: '已结课' },
    { value: ClassStatusEnum.ARCHIVED, label: '已归档' },
];

const accessLevelOptions = [
    { value: '', label: '所有访问级别' },
    { value: ClassAccessLevelEnum.PUBLIC, label: '公开' },
    { value: ClassAccessLevelEnum.INVITE_ONLY, label: '邀请码' },
    { value: ClassAccessLevelEnum.PRIVATE, label: '私有' },
];

const monetizationTypeOptions = [
    { value: '', label: '所有付费类型' },
    { value: ClassMonetizationTypeEnum.FREE, label: '免费' },
    { value: ClassMonetizationTypeEnum.ONE_TIME_PURCHASE, label: '一次性付费' },
];


const ClassToolbar: React.FC<ClassToolbarProps> = ({
                                                       searchTerm,
                                                       onSearchChange,
                                                       onFilterChange,
                                                       onCreateClass,
                                                   }) => {

    const handleSingleFilterChange = (filterName: string, value: string) => {
        onFilterChange({ [filterName]: value });
    };

    return (
        <div className={styles.toolbarContainer}>
            {/* 左侧筛选和搜索区域 */}
            <div className={styles.leftSection}>
                <div className={styles.searchInputWrapper}>
                    <i className={`fas fa-search ${styles.searchIcon}`}></i>
                    <input
                        type="text"
                        placeholder="搜索班级名称..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <select
                    className={styles.filterSelect}
                    onChange={(e) => handleSingleFilterChange('status', e.target.value)}
                >
                    {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <select
                    className={styles.filterSelect}
                    onChange={(e) => handleSingleFilterChange('accessLevel', e.target.value)}
                >
                    {accessLevelOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <select
                    className={styles.filterSelect}
                    onChange={(e) => handleSingleFilterChange('monetizationType', e.target.value)}
                >
                    {monetizationTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            {/* 右侧操作按钮区域 */}
            <div className={styles.rightSection}>
                <button onClick={onCreateClass} className={styles.createButton}>
                    <i className="fas fa-plus"></i>
                    <span>创建班级</span>
                </button>
            </div>
        </div>
    );
};

export default ClassToolbar;