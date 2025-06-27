// src/components/teacher/course-management/ai-generate/ConfigPanel.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ConfigPanel.module.css';
// 核心修改 1：从新的枚举文件中导入类型
import { QuestionDifficulty, QuestionType } from '@/constants/enums';

// 导入子组件
import TypeSelector from './ConfigPanel/TypeSelector';
import DifficultySelector from './ConfigPanel/DifficultySelector';
import KnowledgeScope from './ConfigPanel/KnowledgeScope';
import SupplementaryContent from './ConfigPanel/SupplementaryContent';
import ConfirmationModal from "@/components/common/ConfirmationModal/ConfirmationModal";

// Props 接口现在直接使用导入的枚举类型，这部分是正确的
interface ConfigPanelProps {
    selectedTypes: Set<QuestionType>;
    onTypeChange: (type: QuestionType) => void;
    selectedDifficulty: QuestionDifficulty;
    onDifficultyChange: (difficulty: QuestionDifficulty) => void;
    knowledgePoints: string[];
    onRemovePoint: (point: string) => void;
    supplementaryContent: string;
    onContentChange: (content: string) => void;
    onAddManually: () => void;
    onSelectFromLibrary: () => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = (props) => {
    const router = useRouter();

    const [quantity, setQuantity] = useState(5);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => {
            const newValue = prev + delta;
            if (newValue >= 1 && newValue <= 10) {
                return newValue;
            }
            return prev;
        });
    };

    const handleGenerateToggle = () => {
        if (isGenerating) {
            setIsGenerating(false);
        } else {
            setIsConfirmModalOpen(true);
        }
    };

    const handleConfirmGeneration = () => {
        console.log('Confirmed! Starting generation with config:', {
            types: Array.from(props.selectedTypes),
            difficulty: props.selectedDifficulty,
            quantity: quantity,
            points: props.knowledgePoints,
            content: props.supplementaryContent,
        });
        setIsGenerating(true);
    };

    return (
        <>
            <div className={styles.panel}>
                <header className={styles.header}>
                    <button onClick={() => router.back()} className={styles.backButton} title="返回题库管理">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <i className={`fas fa-wand-magic-sparkles ${styles.headerIcon}`}></i>
                    <h2 className={styles.headerTitle}>AI 智能出题</h2>
                </header>

                <div className={styles.scrollableBody}>
                    <TypeSelector selectedTypes={props.selectedTypes} onTypeChange={props.onTypeChange} />
                    <DifficultySelector selectedDifficulty={props.selectedDifficulty} onDifficultyChange={props.onDifficultyChange} />
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}><span>*</span>出题数量：</h3>
                        <div className={styles.quantitySelector}>
                            <button className={styles.quantityButton} onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                                <i className="fas fa-minus"></i>
                            </button>
                            <span className={styles.quantityDisplay}>{quantity}</span>
                            <button className={styles.quantityButton} onClick={() => handleQuantityChange(1)} disabled={quantity >= 10}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <KnowledgeScope
                        points={props.knowledgePoints}
                        onRemovePoint={props.onRemovePoint}
                        onAddManually={props.onAddManually}
                        onSelectFromLibrary={props.onSelectFromLibrary}
                    />
                    <SupplementaryContent content={props.supplementaryContent} onContentChange={props.onContentChange} />
                </div>

                <footer className={styles.footer}>
                    <button
                        className={`${styles.generateButton} ${isGenerating ? styles.stop : styles.start}`}
                        onClick={handleGenerateToggle}
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {isGenerating ? (
                                <motion.span key="stop" className={styles.buttonText} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <i className={styles.spinner + " fas fa-spinner"}></i> 停止出题
                                </motion.span>
                            ) : (
                                <motion.span key="start" className={styles.buttonText} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <i className="fas fa-play-circle"></i> 开始出题
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </footer>
            </div>
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmGeneration}
                title="确认开始智能出题"
                message={<>AI 将根据您当前的配置生成 <strong>{quantity}</strong> 道题目。<br/>确定要开始吗？</>}
                confirmText="开始出题"
                type="info"
            />
        </>
    );
};
export default ConfigPanel;