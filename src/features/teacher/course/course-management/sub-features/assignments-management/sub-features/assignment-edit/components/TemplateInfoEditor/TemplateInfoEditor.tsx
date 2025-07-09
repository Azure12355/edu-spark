// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-edit/components/TemplateInfoEditor/TemplateInfoEditor.tsx]
"use client";

import React from 'react';
import styles from './TemplateInfoEditor.module.css';
import { AssignmentUpdateRequestDTO } from '@/shared/types';
import { AssignmentTypeEnum } from '@/shared/types/enums/assignment/AssignmentTypeEnum';
import { AssignmentTemplateStatusEnum } from '@/shared/types/enums/assignment/AssignmentTemplateStatusEnum';

// 定义 Props 类型
interface TemplateInfoEditorProps {
    formData: AssignmentUpdateRequestDTO;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    // 假设可以传入一个 isSaving 状态来禁用表单
    isSaving?: boolean;
}

// 模板类型选项
const typeOptions = [
    { value: AssignmentTypeEnum.HOMEWORK, label: '课后作业' },
    { value: AssignmentTypeEnum.QUIZ, label: '随堂测验' },
    { value: AssignmentTypeEnum.MIDTERM_EXAM, label: '期中考试' },
    { value: AssignmentTypeEnum.FINAL_EXAM, label: '期末考试' },
];

// 模板状态选项
const statusOptions = [
    { value: AssignmentTemplateStatusEnum.DRAFT, label: '草稿' },
    { value: AssignmentTemplateStatusEnum.READY, label: '就绪可用' },
];


const TemplateInfoEditor: React.FC<TemplateInfoEditorProps> = ({
                                                                   formData,
                                                                   onFormChange,
                                                                   isSaving = false
                                                               }) => {
    return (
        <div className={styles.editorContainer}>
            <h2 className={styles.sectionTitle}>基本信息</h2>
            <div className={styles.formGrid}>
                {/* 标题 */}
                <div className={`${styles.formItem} ${styles.fullWidth}`}>
                    <label htmlFor="title" className={styles.label}>模板标题</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className={styles.input}
                        value={formData.title || ''}
                        onChange={onFormChange}
                        disabled={isSaving}
                        placeholder="例如：第一章课后作业，期中模拟考试"
                    />
                </div>

                {/* 描述 */}
                <div className={`${styles.formItem} ${styles.fullWidth}`}>
                    <label htmlFor="description" className={styles.label}>描述 (可选)</label>
                    <textarea
                        id="description"
                        name="description"
                        className={styles.textarea}
                        value={formData.description || ''}
                        onChange={onFormChange}
                        disabled={isSaving}
                        placeholder="模板的详细描述或要求"
                        rows={3}
                    ></textarea>
                </div>

                {/* 类型 */}
                <div className={styles.formItem}>
                    <label htmlFor="type" className={styles.label}>模板类型</label>
                    <select
                        id="type"
                        name="type"
                        className={styles.select}
                        value={formData.type || ''}
                        onChange={onFormChange}
                        disabled={isSaving}
                    >
                        {typeOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                {/* 状态 */}
                <div className={styles.formItem}>
                    <label htmlFor="templateStatus" className={styles.label}>模板状态</label>
                    <select
                        id="templateStatus"
                        name="templateStatus"
                        className={styles.select}
                        value={formData.templateStatus || ''}
                        onChange={onFormChange}
                        disabled={isSaving}
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TemplateInfoEditor;