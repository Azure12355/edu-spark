// src/components/teacher/course-management/ai-generate/ConfigPanel.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 1. 导入 useRouter
import { motion, AnimatePresence } from 'framer-motion'; // 2. 导入动画库
import styles from './ConfigPanel.module.css';
import { QuestionDifficulty, QuestionType } from '@/lib/data/questionBankData';

// 导入子组件
import TypeSelector from './ConfigPanel/TypeSelector';
import DifficultySelector from './ConfigPanel/DifficultySelector';
import KnowledgeScope from './ConfigPanel/KnowledgeScope';
import SupplementaryContent from './ConfigPanel/SupplementaryContent';
import ConfirmationModal from "@/components/common/ConfirmationModal/ConfirmationModal";

// Props 接口保持不变
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
    const router = useRouter(); // 3. 获取 router 实例

    // --- 核心新增：管理出题数量和出题状态 ---
    const [quantity, setQuantity] = useState(5);
    const [isGenerating, setIsGenerating] = useState(false);

    // --- 核心新增：管理模态框状态 ---
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

    // --- 核心修改：按钮点击逻辑 ---
    const handleGenerateToggle = () => {
        if (isGenerating) {
            // 如果正在生成，则直接停止
            setIsGenerating(false);
            // 这里可以添加调用 API 取消生成的逻辑
        } else {
            // 如果是开始生成，则打开确认模态框
            setIsConfirmModalOpen(true);
        }
    };


    // --- 核心新增：处理确认出题的逻辑 ---
    const handleConfirmGeneration = () => {
        // 在实际应用中，这里会调用 API
        console.log('Confirmed! Starting generation with config:', {
            types: Array.from(props.selectedTypes),
            difficulty: props.selectedDifficulty,
            quantity: quantity,
            points: props.knowledgePoints,
            content: props.supplementaryContent,
        });
        setIsGenerating(true);
        // onClose is handled by the modal component itself
    };

    return (
        <>
            <div className={styles.panel}>
                <header className={styles.header}>
                    {/* 4. 新增返回按钮 */}
                    <button onClick={() => router.back()} className={styles.backButton} title="返回题库管理">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <i className={`fas fa-wand-magic-sparkles ${styles.headerIcon}`}></i>
                    <h2 className={styles.headerTitle}>AI 智能出题</h2>
                </header>

                <div className={styles.scrollableBody}>
                    {/* 移除 Tab 栏 */}

                    {/* 题型选择 */}
                    <TypeSelector selectedTypes={props.selectedTypes} onTypeChange={props.onTypeChange} />

                    {/* 难度选择 */}
                    <DifficultySelector selectedDifficulty={props.selectedDifficulty} onDifficultyChange={props.onDifficultyChange} />

                    {/* 5. 新增出题数量选择器 */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}><span>*</span>出题数量：</h3>
                        <div className={styles.quantitySelector}>
                            <button
                                className={styles.quantityButton}
                                onClick={() => handleQuantityChange(-1)}
                                disabled={quantity <= 1}
                            >
                                <i className="fas fa-minus"></i>
                            </button>
                            <span className={styles.quantityDisplay}>{quantity}</span>
                            <button
                                className={styles.quantityButton}
                                onClick={() => handleQuantityChange(1)}
                                disabled={quantity >= 10}
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    {/* 知识点范围 */}
                    <KnowledgeScope
                        points={props.knowledgePoints}
                        onRemovePoint={props.onRemovePoint}
                        onAddManually={props.onAddManually}
                        onSelectFromLibrary={props.onSelectFromLibrary}
                    />

                    {/* 补充内容 */}
                    <SupplementaryContent content={props.supplementaryContent} onContentChange={props.onContentChange} />
                </div>

                <footer className={styles.footer}>
                    {/* 6. 重构底部按钮 */}
                    <button
                        className={`${styles.generateButton} ${isGenerating ? styles.stop : styles.start}`}
                        onClick={handleGenerateToggle}
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {isGenerating ? (
                                <motion.span
                                    key="stop"
                                    className={styles.buttonText}
                                    initial={{ y: 15, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -15, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <i className={styles.spinner + " fas fa-spinner"}></i> 停止出题
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="start"
                                    className={styles.buttonText}
                                    initial={{ y: 15, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -15, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <i className="fas fa-play-circle"></i> 开始出题
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </footer>
            </div>
            {/* --- 核心新增：渲染确认模态框 --- */}
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmGeneration}
                title="确认开始智能出题"
                message={
                    <>
                        AI 将根据您当前的配置生成 <strong>{quantity}</strong> 道题目。
                        <br/>
                        确定要开始吗？
                    </>
                }
                confirmText="开始出题"
                type="info"
            />
        </>

    );
};
export default ConfigPanel;