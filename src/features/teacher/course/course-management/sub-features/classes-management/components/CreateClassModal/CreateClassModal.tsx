// [!file src/features/teacher/course/course-management/sub-features/classes-management/components/CreateClassModal/CreateClassModal.tsx]
"use client";

import React, { useState, useEffect } from 'react';
import styles from './CreateClassModal.module.css';
import Modal from '@/shared/components/ui/Modal/Modal';
import { useToast } from '@/shared/hooks/useToast';
import { useParams } from "next/navigation";
import {ClassCreateRequestDTO} from "@/shared/types/dto/course/classes";
import {createClass} from "@/shared/services";

// 定义 Props 类型
interface CreateClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (newClass: any) => void; // 创建成功后的回调
}

// 表单的初始状态
const initialState: ClassCreateRequestDTO = {
    courseId: 0, // 将在 effect 中设置
    name: '',
    term: '',
    accessLevel: 'INVITE_ONLY',
    enrollmentCode: '',
    monetizationType: 'FREE',
    price: 0,
    maxMembers: 100,
};

const CreateClassModal: React.FC<CreateClassModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState<ClassCreateRequestDTO>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof ClassCreateRequestDTO, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const params = useParams();
    const courseId = Number(params.id);
    const showToast = useToast();

    // 当弹窗打开时，重置表单并设置 courseId
    useEffect(() => {
        if (isOpen) {
            setFormData({ ...initialState, courseId: courseId });
            setErrors({});
        }
    }, [isOpen, courseId]);

    // 输入处理函数
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // 当用户开始输入时，清除该字段的错误
        if (errors[name as keyof ClassCreateRequestDTO]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // 表单校验函数
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof ClassCreateRequestDTO, string>> = {};
        if (!formData.name.trim()) newErrors.name = '班级名称不能为空';
        if (formData.name.length > 100) newErrors.name = '班级名称不能超过100个字符';
        if (!formData.term.trim()) newErrors.term = '开课学期不能为空';
        if (formData.accessLevel === 'INVITE_ONLY' && !formData.enrollmentCode?.trim()) {
            newErrors.enrollmentCode = '邀请模式下，邀请码不能为空';
        }
        if (formData.monetizationType === 'ONE_TIME_PURCHASE' && (!formData.price || formData.price <= 0)) {
            newErrors.price = '付费模式下，价格必须大于0';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 表单提交函数
    const handleSubmit = async () => {
        if (!validateForm()) {
            showToast({ message: '请检查表单输入项', type: 'warning' });
            return;
        }

        setIsSubmitting(true);
        try {
            const newClass = await createClass(formData);
            showToast({ message: '班级创建成功！', type: 'success' });
            onSuccess(newClass);
            onClose();
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
        <Modal isOpen={isOpen} onClose={onClose} title="创建新班级" footer={footer}>
            <div className={styles.formGrid}>
                {/* 班级名称 */}
                <div className={`${styles.formItem} ${styles.fullWidth}`}>
                    <label htmlFor="name" className={styles.label}>班级名称</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="例如：2024秋-数据结构01班"
                    />
                    {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                </div>

                {/* 开课学期 */}
                <div className={styles.formItem}>
                    <label htmlFor="term" className={styles.label}>开课学期</label>
                    <input
                        id="term"
                        name="term"
                        type="text"
                        className={`${styles.input} ${errors.term ? styles.inputError : ''}`}
                        value={formData.term}
                        onChange={handleChange}
                        placeholder="例如：2024-2025 第一学期"
                    />
                    {errors.term && <p className={styles.errorMessage}>{errors.term}</p>}
                </div>

                {/* 访问级别 */}
                <div className={styles.formItem}>
                    <label htmlFor="accessLevel" className={styles.label}>访问级别</label>
                    <select
                        id="accessLevel"
                        name="accessLevel"
                        className={styles.input}
                        value={formData.accessLevel}
                        onChange={handleChange}
                    >
                        <option value="INVITE_ONLY">邀请码加入</option>
                        <option value="PRIVATE">私有（仅教师邀请）</option>
                        <option value="PUBLIC">公开</option>
                    </select>
                </div>

                {/* 邀请码 (条件渲染) */}
                {formData.accessLevel === 'INVITE_ONLY' && (
                    <div className={styles.formItem}>
                        <label htmlFor="enrollmentCode" className={styles.label}>邀请码</label>
                        <input
                            id="enrollmentCode"
                            name="enrollmentCode"
                            type="text"
                            className={`${styles.input} ${errors.enrollmentCode ? styles.inputError : ''}`}
                            value={formData.enrollmentCode}
                            onChange={handleChange}
                            placeholder="请输入班级邀请码"
                        />
                        {errors.enrollmentCode && <p className={styles.errorMessage}>{errors.enrollmentCode}</p>}
                    </div>
                )}

                {/* 付费类型 */}
                <div className={styles.formItem}>
                    <label htmlFor="monetizationType" className={styles.label}>付费类型</label>
                    <select
                        id="monetizationType"
                        name="monetizationType"
                        className={styles.input}
                        value={formData.monetizationType}
                        onChange={handleChange}
                    >
                        <option value="FREE">免费</option>
                        <option value="ONE_TIME_PURCHASE">一次性付费</option>
                    </select>
                </div>

                {/* 价格 (条件渲染) */}
                {formData.monetizationType === 'ONE_TIME_PURCHASE' && (
                    <div className={styles.formItem}>
                        <label htmlFor="price" className={styles.label}>价格 (元)</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="请输入价格"
                            min="0"
                        />
                        {errors.price && <p className={styles.errorMessage}>{errors.price}</p>}
                    </div>
                )}

                {/* 班级人数 */}
                <div className={styles.formItem}>
                    <label htmlFor="maxMembers" className={styles.label}>班级人数上限</label>
                    <input
                        id="maxMembers"
                        name="maxMembers"
                        type="number"
                        className={styles.input}
                        value={formData.maxMembers}
                        onChange={handleChange}
                        placeholder="0 或不填表示无限制"
                        min="0"
                    />
                </div>
            </div>
        </Modal>
    );
};

export default CreateClassModal;