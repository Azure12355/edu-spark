"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AddChunkModal.module.css';
import { documentData, getFileIcon } from '@/lib/data/documentData';

interface AddChunkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddChunk: (chunk: { documentId: string, content: string }) => void;
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, scale: 0.95 },
};

const AddChunkModal: React.FC<AddChunkModalProps> = ({ isOpen, onClose, onAddChunk }) => {
    const [selectedDoc, setSelectedDoc] = useState(documentData[0]);
    const [content, setContent] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const MAX_CHARS = 2000;
    const isFormValid = selectedDoc && content.trim() !== '' && content.length <= MAX_CHARS;

    const handleAdd = () => {
        if (isFormValid) {
            onAddChunk({ documentId: selectedDoc.id, content });
            setContent('');
            onClose();
        }
    };

    // 点击外部关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleSelectDoc = (doc: typeof documentData[0]) => {
        setSelectedDoc(doc);
        setIsDropdownOpen(false);
    };

    const getIconInfo = (doc: typeof documentData[0]) => getFileIcon(doc.type);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className={styles.backdrop} variants={backdropVariants} initial="hidden" animate="visible" exit="hidden">
                    <motion.div className={styles.modal} variants={modalVariants} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>添加切片</h2>
                            <button className={styles.closeButton} onClick={onClose} title="关闭"><i className="fas fa-times"></i></button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    <span className={styles.required}>*</span> 所属文档 <i className={`far fa-question-circle ${styles.infoIcon}`}></i>
                                </label>
                                <div className={styles.customSelectWrapper} ref={dropdownRef}>
                                    <div className={`${styles.selectDisplay} ${isDropdownOpen ? styles.open : ''}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                        <i className={`fas ${getIconInfo(selectedDoc).icon}`} style={{ color: getIconInfo(selectedDoc).color }}></i>
                                        <span>{selectedDoc.name}</span>
                                        <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
                                    </div>
                                    {isDropdownOpen && (
                                        <div className={styles.dropdownList}>
                                            {documentData.map(doc => (
                                                <div key={doc.id} className={`${styles.dropdownItem} ${selectedDoc.id === doc.id ? styles.selected : ''}`} onClick={() => handleSelectDoc(doc)}>
                                                    <i className={`fas ${getIconInfo(doc).icon}`} style={{ color: getIconInfo(doc).color }}></i>
                                                    <span>{doc.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}><span className={styles.required}>*</span> 切片内容</label>
                                <div className={styles.textareaWrapper}>
                                    <textarea
                                        className={styles.textarea}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="请输入切片内容"
                                        maxLength={MAX_CHARS}
                                    />
                                    <span className={styles.charCount}>{content.length}/{MAX_CHARS}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={onClose} className={`${styles.footerButton} ${styles.cancelButton}`}>取消</button>
                            <button onClick={handleAdd} className={`${styles.footerButton} ${styles.addButton}`} disabled={!isFormValid}>添加</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
export default AddChunkModal;