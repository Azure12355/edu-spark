// [!file src/features/teacher/course/course-management/sub-features/assignments-management/components/CreateAssignmentModal/CreateAssignmentModal.tsx]
"use client";

import React, { useState, useEffect } from 'react';
import styles from './CreateAssignmentModal.module.css';
import Modal from '@/shared/components/ui/Modal/Modal';
import { useToast } from '@/shared/hooks/useToast';
import { AssignmentCreateRequestDTO, AssignmentVO } from '@/shared/types';
import { useParams } from 'next/navigation';
import { AssignmentTypeEnum } from '@/shared/types/enums/assignment/AssignmentTypeEnum';
import {createAssignmentTemplate} from "@/shared/services";

// 定义 Props 类型
interface CreateAssignmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (newAssignment: AssignmentVO) => void;
}

// 表单的初始状态
const initialState: AssignmentCreateRequestDTO = {
    courseId: 0, // 将在 useEffect 中设置
    title: '',
    description: '',
    type: AssignmentTypeEnum.HOMEWORK, // 默认类型为作业
};

// 模板类型选项
const typeOptions = [
    { value: AssignmentTypeEnum.HOMEWORK, label: '课后作业' },
    { value: AssignmentTypeEnum.QUIZ, label: '随堂测验' },
    { value: AssignmentTypeEnum.MIDTERM_EXAM, label: '期中考试' },
    { value: AssignmentTypeEnum.FINAL_EXAM, label: '期末考试' },
];

const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({ isOpen, onClose, onSuccess }) => {
    // 1. 状态管理
    const [formData, setFormData] = useState<AssignmentCreateRequestDTO>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof AssignmentCreateRequestDTO, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const params = useParams();
    const courseId = Number(params.id); // 从URL中获取当前课程ID
    const showToast = useToast();

    // 2. Effect Hook: 当弹窗打开时，重置表单并设置 courseId
    useEffect(() => {
        if (isOpen) {
            setFormData({ ...initialState, courseId: courseId });
            setErrors({});
            setIsSubmitting(false); // 确保每次打开都是未提交状态
        }
    }, [isOpen, courseId]);

    // 3. 输入处理函数
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // 当用户开始输入时，清除该字段的错误
        if (errors[name as keyof AssignmentCreateRequestDTO]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // 4. 表单校验函数
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof AssignmentCreateRequestDTO, string>> = {};
        if (!formData.title.trim()) newErrors.title = '模板标题不能为空';
        if (formData.title.length > 255) newErrors.title = '标题不能超过255个字符';
        if (formData.description && formData.description.length > 2048) newErrors.description = '描述内容过长';
        if (!formData.type) newErrors.type = '必须选择模板类型';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 5. 表单提交函数
    const handleSubmit = async () => {
        if (!validateForm()) {
            showToast({ message: '请检查表单输入项', type: 'warning' });
            return;
        }

        setIsSubmitting(true);
        try {
            const newAssignment = await createAssignmentTemplate(formData);
            showToast({ message: '作业/考试模板创建成功！', type: 'success' });
            onSuccess(newAssignment); // 调用成功回调，传递新创建的模板数据
            onClose(); // 关闭弹窗
        } catch (error) {
            // 错误已由 apiClient 拦截器处理，这里无需再次弹窗
        } finally {
            setIsSubmitting(false);
        }
    };

    // Modal 的页脚按钮
    const footer = (
        <>
            <button onClick={onClose} className={`${styles.button} ${styles.cancelButton}`} disabled={isSubmitting}>
                取消
            </button>
            <button onClick={handleSubmit} className={`${styles.button} ${styles.confirmButton}`} disabled={isSubmitting}>
                {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> 创建中...</> : '确认创建'}
            </button>
        </>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="创建新模板" footer={footer}>
            <div className={styles.formGrid}>
                {/* 模板标题 */}
                <div className={`${styles.formItem} ${styles.fullWidth}`}>
                    <label htmlFor="title" className={styles.label}>模板标题</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="例如：第一章课后作业，期中模拟考试"
                    />
                    {errors.title && <p className={styles.errorMessage}>{errors.title}</p>}
                </div>

                {/* 模板描述 */}
                <div className={`${styles.formItem} ${styles.fullWidth}`}>
                    <label htmlFor="description" className={styles.label}>模板描述 (可选)</label>
                    <textarea
                        id="description"
                        name="description"
                        className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="模板的详细描述或要求"
                        rows={3}
                    ></textarea>
                    {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}
                </div>

                {/* 模板类型 */}
                <div className={styles.formItem}>
                    <label htmlFor="type" className={styles.label}>模板类型</label>
                    <select
                        id="type"
                        name="type"
                        className={`${styles.select} ${errors.type ? styles.inputError : ''}`}
                        value={formData.type}
                        onChange={handleChange}
                    >
                        {typeOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    {errors.type && <p className={styles.errorMessage}>{errors.type}</p>}
                </div>

                {/* courseId 隐藏字段 */}
                <input type="hidden" name="courseId" value={formData.courseId} />
            </div>
        </Modal>
    );
};

export default CreateAssignmentModal;