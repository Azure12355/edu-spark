// src/components/teacher/course-management/ai-generate/ConfigPanel.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ConfigPanel.module.css';
import { QuestionDifficulty, QuestionType } from '@/shared/constants/enums';
import { useAIGeneratedQuestionsStore } from '@/features/teacher/course/course-management/sub-features/ai-question-generator/store/aiGeneratedQuestionsStore';
import { useToast } from '@/shared/hooks/useToast';
import { runQuestionGenerationWorkflow } from '@/shared/api/cozeService';
import type { CozeWorkflowInputParameters } from '@/shared/types/coze';
import { KnowledgePoint, KnowledgePointType } from '@/shared/types/knowledge';

// 导入子组件
import TypeSelector from './ConfigPanel/TypeSelector';
import DifficultySelector from './ConfigPanel/DifficultySelector';
import KnowledgeScope from './ConfigPanel/KnowledgeScope';
import SupplementaryContent from './ConfigPanel/SupplementaryContent';
import ConfirmationModal from "@/shared/components/ui/ConfirmationModal/ConfirmationModal";

interface ConfigPanelProps {
    selectedTypes: Set<QuestionType>;
    onTypeChange: (type: QuestionType) => void;
    selectedDifficulty: QuestionDifficulty;
    onDifficultyChange: (difficulty: QuestionDifficulty) => void;
    // BugFix: 更新 props 类型
    knowledgePoints: KnowledgePoint[];
    onRemovePoint: (pointId: string) => void;
    supplementaryContent: string;
    onContentChange: (content: string) => void;
    onAddManually: () => void;
    onSelectFromLibrary: () => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = (props) => {
    const router = useRouter();
    const showToast = useToast();
    const { setQuestions, clearQuestions } = useAIGeneratedQuestionsStore();

    const [quantity, setQuantity] = useState(5);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
    };

    const handleGenerateToggle = () => {
        if (isGenerating) {
            console.log("请求取消功能暂未实现");
        } else {
            if (props.knowledgePoints.length === 0) {
                showToast({ message: "请至少选择一个知识点范围", type: "warning" });
                return;
            }
            setIsConfirmModalOpen(true);
        }
    };

    const handleConfirmGeneration = async () => {
        setIsGenerating(true);
        clearQuestions();

        try {
            const params: CozeWorkflowInputParameters = {
                courseContext: { courseId: "cs101", courseName: "数据结构与算法" },
                generationConfig: {
                    difficulty: props.selectedDifficulty,
                    language: "zh-CN",
                    modelPreference: "QWEN",
                    quantity: quantity,
                    questionTypes: Array.from(props.selectedTypes),
                },
                // BugFix: 直接使用 props 传入的 knowledgePoints 对象数组
                knowledgePoints: props.knowledgePoints,
                supplementaryInstruc: props.supplementaryContent,
                user: { userId: "user-teacher-01", userName: "王老师" },
            };

            const response = await runQuestionGenerationWorkflow(params);

            if (response.code === '200' && response.data.generatedQuestions) {
                setQuestions(response.data.generatedQuestions);
                showToast({ message: response.data.greeting || "题目生成成功！", type: "success" });
            } else {
                throw new Error(response.msg || 'AI服务返回了无效的数据格式。');
            }
        } catch (error: any) {
            console.error("AI 出题失败:", error);
            showToast({ message: error.message || 'AI出题时发生未知错误', type: "error" });
        } finally {
            setIsGenerating(false);
        }
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
                    {/* BugFix: 确保传递正确的 props */}
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
                        disabled={isGenerating}
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {isGenerating ? (
                                <motion.span key="stop" className={styles.buttonText} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <i className={styles.spinner + " fas fa-spinner"}></i> 正在出题...
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
                message={<>AI 将根据您当前的配置生成 <strong>{quantity}</strong> 道题目。<br/>此操作会覆盖上次生成的结果，确定要开始吗？</>}
                confirmText="开始出题"
                type="info"
            />
        </>
    );
};
export default ConfigPanel;