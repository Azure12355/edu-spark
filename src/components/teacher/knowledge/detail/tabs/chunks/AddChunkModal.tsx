"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { useParams } from 'next/navigation';
import { getFileIcon } from '@/lib/data/documentData';
import styles from './AddChunkModal.module.css';
import { DocumentVO } from '@/services/knowledgeService';
import {AddChunkRequest} from "@/services/chunkService";

// 1. 定义 Props 接口，明确回调函数的数据结构
interface AddChunkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddChunk: (chunkData: AddChunkRequest) => Promise<boolean>;
    documents: DocumentVO[];
}

// 2. 将下拉菜单提取为独立的子组件，增加复用性和可维护性
const DocumentSelector: React.FC<{
    documents: DocumentVO[];
    selectedId: number | null;
    onSelect: (id: number) => void;
}> = ({ selectedId, onSelect, documents }) => {
    const params = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedDoc = useMemo(() => documents.find(d => d.id === selectedId), [documents, selectedId]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const iconInfo = selectedDoc ? getFileIcon(selectedDoc.type as any) : { icon: 'fa-question-circle', color: '#6c757d' };

    return (
        <div className={styles.customSelectWrapper} ref={dropdownRef}>
            <div className={`${styles.selectDisplay} ${isOpen ? styles.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {selectedDoc ? (
                    <>
                        <i className={`fas ${iconInfo.icon}`} style={{ color: iconInfo.color }}></i>
                        <span>{selectedDoc.name}</span>
                    </>
                ) : (
                    <span className={styles.placeholder}>请选择一个来源文档</span>
                )}
                <i className={`fas fa-chevron-down ${styles.chevron}`}></i>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className={styles.dropdownList}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {documents.map(doc => (
                            <li key={doc.id} className={`${styles.dropdownItem} ${selectedId === doc.id ? styles.selected : ''}`} onClick={() => { onSelect(doc.id); setIsOpen(false); }}>
                                <i className={`fas ${getFileIcon(doc.type as any).icon}`} style={{ color: getFileIcon(doc.type as any).color }}></i>
                                <span>{doc.name}</span>
                                {selectedId === doc.id && <i className="fas fa-check"></i>}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};


// 3. 主模态框组件
const AddChunkModal: React.FC<AddChunkModalProps> = ({ isOpen, onClose, onAddChunk, documents }) => {
    const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const MAX_CHARS = 2000;

    const isFormValid = selectedDocId && content.trim() !== '' && content.length <= MAX_CHARS;

    useEffect(() => {
        if (!isOpen) {
            setSelectedDocId(null);
            setContent('');
            setIsSubmitting(false);
        }
    }, [isOpen]);

    const handleAdd = async () => {
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);
        const success = await onAddChunk({ documentId: selectedDocId, content });
        setIsSubmitting(false);
        if (success) {
            onClose();
        }
    };


    const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    const modalVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
        exit: { opacity: 0, y: 30, scale: 0.95 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className={styles.backdrop} variants={backdropVariants} initial="hidden" animate="visible" exit="hidden" onClick={onClose}>
                    <motion.div className={styles.modal} variants={modalVariants} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>手动添加切片</h2>
                            <button className={styles.closeButton} onClick={onClose} title="关闭"><i className="fas fa-times"></i></button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}><span className={styles.required}>*</span> 所属文档</label>
                                <DocumentSelector documents={documents} selectedId={selectedDocId} onSelect={(id) => setSelectedDocId(Number(id))} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}><span className={styles.required}>*</span> 切片内容</label>
                                <div className={styles.textareaWrapper}>
                                    <textarea
                                        className={styles.textarea}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="请输入切片内容..."
                                        maxLength={MAX_CHARS}
                                    />
                                    <span className={`${styles.charCount} ${content.length >= MAX_CHARS ? styles.error : ''}`}>{content.length}/{MAX_CHARS}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={onClose} className={`${styles.footerButton} ${styles.cancelButton}`}>取消</button>
                            <button onClick={handleAdd} className={`${styles.footerButton} ${styles.addButton}`} disabled={!isFormValid || isSubmitting}>
                                {isSubmitting ? '添加中...' : '确认添加'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
export default AddChunkModal;