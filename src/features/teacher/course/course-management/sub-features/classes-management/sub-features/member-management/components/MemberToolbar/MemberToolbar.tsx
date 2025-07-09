// [!file src/features/teacher/course/course-management/sub-features/classes-management/sub-features/member-management/components/MemberToolbar/MemberToolbar.tsx]
"use client";

import React from 'react';
import styles from './MemberToolbar.module.css';
import { ClassMemberRoleEnum } from '@/shared/types/enums/course/ClassMemberRoleEnum';
import { ClassMemberStatusEnum } from '@/shared/types/enums/course/ClassMemberStatusEnum';
import {MemberQueryRequestDTO} from "@/shared/types/dto/course/classes";

// 定义 Props 类型
interface MemberToolbarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onFilterChange: (filters: Partial<Pick<MemberQueryRequestDTO, 'role' | 'status'>>) => void;
}

// 筛选器选项
const roleOptions = [
    { value: '', label: '所有角色' },
    { value: ClassMemberRoleEnum.STUDENT, label: '学生' },
    { value: ClassMemberRoleEnum.TEACHER, label: '教师/助教' },
];

const statusOptions = [
    { value: '', label: '所有状态' },
    { value: ClassMemberStatusEnum.ACTIVE, label: '正常' },
    { value: ClassMemberStatusEnum.INACTIVE, label: '已停用' },
];


const MemberToolbar: React.FC<MemberToolbarProps> = ({
                                                         searchTerm,
                                                         onSearchChange,
                                                         onFilterChange,
                                                     }) => {

    const handleFilterChangeInternal = (filterName: 'role' | 'status', value: string) => {
        onFilterChange({ [filterName]: value });
    };

    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.searchInputWrapper}>
                <i className={`fas fa-search ${styles.searchIcon}`}></i>
                <input
                    type="text"
                    placeholder="搜索成员昵称或用户名..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className={styles.filtersWrapper}>
                <select
                    className={styles.filterSelect}
                    onChange={(e) => handleFilterChangeInternal('role', e.target.value)}
                    aria-label="按角色筛选"
                >
                    {roleOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                <select
                    className={styles.filterSelect}
                    onChange={(e) => handleFilterChangeInternal('status', e.target.value)}
                    aria-label="按状态筛选"
                >
                    {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MemberToolbar;