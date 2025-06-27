"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KnowledgeFormatType } from '@/types/knowledge';
import styles from './CreateKnowledgeModal.module.css';

interface CreateKnowledgeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: { name: string, description: string, format_type: KnowledgeFormatType }) => void;
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, y: 30, scale: 0.95 },
};

const CreateKnowledgeModal: React.FC<CreateKnowledgeModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [formatType, setFormatType] = useState<KnowledgeFormatType>(0); // 默认文本类型

    const isFormValid = name.trim() !== '';

    useEffect(() => {
        // 当弹窗打开时，重置表单
        if (isOpen) {
            setName('');
            setDescription('');
            setFormatType(0);
        }
    }, [isOpen]);

    const handleCreate = () => {
        if (isFormValid) {
            onCreate({ name, description, format_type: formatType });
            onClose(); // 创建成功后关闭弹窗
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.backdrop}
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modal}
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className={styles.modalHeader}>
                            <h2>创建新知识库</h2>
                            <button className={styles.closeButton} onClick={onClose} title="关闭">
                                <i className="fas fa-times"></i>
                            </button>
                        </header>

                        <main className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label htmlFor="kb-name">知识库名称 <span className={styles.required}>*</span></label>
                                <input
                                    id="kb-name"
                                    type="text"
                                    className={styles.input}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="例如：考研政治核心知识点"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="kb-desc">描述 (可选)</label>
                                <textarea
                                    id="kb-desc"
                                    className={styles.textarea}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="简要描述此知识库的用途和内容范围"
                                    rows={3}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>知识库类型 <span className={styles.required}>*</span></label>
                                <div className={styles.typeSelector}>
                                    <button
                                        className={`${styles.typeButton} ${formatType === 0 ? styles.active : ''}`}
                                        onClick={() => setFormatType(0)}
                                    >
                                        <i className="fas fa-file-alt"></i> 文本类型
                                    </button>
                                    <button
                                        className={`${styles.typeButton} ${formatType === 2 ? styles.active : ''}`}
                                        onClick={() => setFormatType(2)}
                                    >
                                        <i className="fas fa-image"></i> 图片类型
                                    </button>
                                </div>
                            </div>
                        </main>

                        <footer className={styles.modalFooter}>
                            <button className={`${styles.footerButton} ${styles.cancelButton}`} onClick={onClose}>
                                取消
                            </button>
                            <button
                                className={`${styles.footerButton} ${styles.createButton}`}
                                onClick={handleCreate}
                                disabled={!isFormValid}
                            >
                                确认创建
                            </button>
                        </footer>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CreateKnowledgeModal;