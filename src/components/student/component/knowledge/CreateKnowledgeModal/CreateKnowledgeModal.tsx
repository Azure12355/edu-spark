"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CreateKnowledgeModal.module.css';

interface CreateKnowledgeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string, description: string) => void;
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

    const isFormValid = name.trim() !== '' && description.trim() !== '';

    const handleCreate = () => {
        if (isFormValid) {
            onCreate(name, description);
            // 清空表单并关闭弹窗
            setName('');
            setDescription('');
            onClose();
        }
    };

    // 按下 Escape 键关闭弹窗
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

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
                        onClick={(e) => e.stopPropagation()} // 防止点击弹窗内部关闭
                    >
                        <div className={styles.modalHeader}>
                            <h2>创建新知识库</h2>
                            <button className={styles.closeButton} onClick={onClose} title="关闭">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="kb-name">知识库名称</label>
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
                            <label htmlFor="kb-desc">描述</label>
                            <textarea
                                id="kb-desc"
                                className={styles.textarea}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="简要描述此知识库的用途和内容范围"
                                required
                            />
                        </div>

                        <div className={styles.modalFooter}>
                            <button className={`${styles.footerButton} ${styles.cancelButton}`} onClick={onClose}>
                                取消
                            </button>
                            <button
                                className={`${styles.footerButton} ${styles.createButton}`}
                                onClick={handleCreate}
                                disabled={!isFormValid}
                            >
                                创建
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CreateKnowledgeModal;