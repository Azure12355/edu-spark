// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/ParametersPanel/ModelSelector/ModelSelectionModal.tsx]
"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './ModelSelectionModal.module.css';
import { AvailableModel } from '@/shared/lib/data/availableModels';

interface ModelSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    models: AvailableModel[];
    selectedModelId: string;
    onSelectModel: (modelId: string) => void;
}

const backdropVariants = { /* ... 保持不变 ... */ };
const modalVariants = { /* ... 保持不变 ... */ };

const ModelSelectionModal: React.FC<ModelSelectionModalProps> = ({
                                                                     isOpen,
                                                                     onClose,
                                                                     models,
                                                                     selectedModelId,
                                                                     onSelectModel,
                                                                 }) => {

    const handleSelect = (modelId: string) => {
        // [!code focus start]
        // --- 核心修复：只调用 onSelectModel，不再调用 onClose ---
        onSelectModel(modelId);
        // [!code focus end]
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.backdrop}
                    /* ... */
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modal}
                        /* ... */
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className={styles.modalHeader}>
                            <h2>选择语言模型</h2>
                            <button className={styles.closeButton} onClick={onClose} title="关闭">
                                <i className="fas fa-times"></i>
                            </button>
                        </header>
                        <main className={styles.modalBody}>
                            {models.map(model => (
                                <button
                                    key={model.id}
                                    className={`${styles.modelCard} ${selectedModelId === model.id ? styles.selected : ''}`}
                                    onClick={() => handleSelect(model.id)} // 调用修复后的 handleSelect
                                >
                                    <div className={styles.cardHeader}>
                                        <div className={styles.modelName}>
                                            <i className="fas fa-microchip"></i>
                                            {model.name}
                                        </div>
                                        {model.tag && <span className={styles.modelTag}>{model.tag}</span>}
                                    </div>
                                    <p className={styles.modelDescription}>{model.description}</p>
                                    <div className={styles.modelProvider}>{model.provider}</div>
                                    {selectedModelId === model.id && (
                                        <div className={styles.checkIcon}>
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </main>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModelSelectionModal;