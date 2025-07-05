// [!file src/features/teacher/course/course-management/sub-features/point-edit/components/MetadataModal/MetadataModal.tsx]
"use client";

import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import Modal from '@/shared/components/ui/Modal/Modal';
import styles from './MetadataModal.module.css';
import { LocalEditablePoint } from '../../types';

interface MetadataModalProps {
    isOpen: boolean;
    onClose: () => void;
    point: LocalEditablePoint | null; // 接收父组件传递的完整可编辑对象
    // 回调函数，用于将所有更改一次性提交给父组件的 Hook
    onSave: (updates: Pick<LocalEditablePoint, 'title' | 'difficulty' | 'tags'>) => void;
}

// 难度选项
const difficulties: LocalEditablePoint['difficulty'][] = ['简单', '中等', '困难'];

const MetadataModal: React.FC<MetadataModalProps> = ({ isOpen, onClose, point, onSave }) => {
    // 1. 使用 useImmer 管理模态框内部的临时表单状态
    const [formData, setFormData] = useImmer({
        title: '',
        difficulty: '中等' as LocalEditablePoint['difficulty'],
        tags: '', // 将标签数组处理为逗号分隔的字符串
    });

    // 2. 当模态框打开或外部 point 数据变化时，同步内部表单状态
    useEffect(() => {
        if (isOpen && point) {
            setFormData(draft => {
                draft.title = point.title;
                draft.difficulty = point.difficulty;
                draft.tags = point.tags.join(', ');
            });
        }
    }, [isOpen, point, setFormData]);

    // 3. 处理保存逻辑
    const handleSave = () => {
        if (!formData.title.trim()) {
            // 可以在这里添加 Toast 提示
            alert("知识点标题不能为空！");
            return;
        }

        // 将表单数据转换为父组件需要的格式
        const updates = {
            title: formData.title.trim(),
            difficulty: formData.difficulty,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean), // 分割、去空格、去空值
        };

        onSave(updates); // 调用父组件的 onSave 回调
        onClose(); // 关闭模态框
    };

    // 如果 point 数据尚未加载，不渲染模态框内容，防止闪烁
    if (!point) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="编辑知识点元信息"
            footer={
                <>
                    <button className={`${styles.footerButton} ${styles.cancelButton}`} onClick={onClose}>取消</button>
                    <button className={`${styles.footerButton} ${styles.saveButton}`} onClick={handleSave}>保存更改</button>
                </>
            }
        >
            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">知识点标题</label>
                    <input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(draft => { draft.title = e.target.value; })}
                        placeholder="请输入知识点标题"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>难度</label>
                    <div className={styles.difficultySelector}>
                        {difficulties.map(d => (
                            <button
                                key={d}
                                className={formData.difficulty === d ? styles.active : ''}
                                onClick={() => setFormData(draft => { draft.difficulty = d; })}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="tags">标签 (用逗号分隔)</label>
                    <input
                        id="tags"
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData(draft => { draft.tags = e.target.value; })}
                        placeholder="例如：核心, 算法基础"
                    />
                </div>
            </div>
        </Modal>
    );
};

export default MetadataModal;