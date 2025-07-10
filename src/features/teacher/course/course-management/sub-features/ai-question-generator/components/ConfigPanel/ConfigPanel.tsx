// [!file src/features/teacher/course/course-management/sub-features/ai-question-generator/components/ConfigPanel/ConfigPanel.tsx]
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './ConfigPanel.module.css';

// 1. 导入所有需要的子组件和 Hook
import TypeSelector from './TypeSelector/TypeSelector';
import DifficultySelector from './DifficultySelector/DifficultySelector';
import KnowledgeScope from './KnowledgeScope/KnowledgeScope';
import SupplementaryContent from './SupplementaryContent/SupplementaryContent';
import ConfirmationModal from "@/shared/components/ui/ConfirmationModal/ConfirmationModal";
import InputModal from "@/shared/components/ui/InputModal/InputModal";
import KnowledgePointSelectionModal from './KnowledgePointSelectionModal/KnowledgePointSelectionModal';
import { useAIConfig } from '../../hooks/useAIConfig';
import {useConfirmationModal} from "@/shared/hooks/useConfirmationModal";

const ConfigPanel: React.FC = () => {
    const router = useRouter();

    // 2. 一行代码从 Hook 获取所有状态和逻辑
    const {
        config,
        isGenerating,
        isPointModalOpen,
        isAddPointModalOpen,
        handleGenerate,
        updateConfig,
        handleQuantityChange,
        openPointModal,
        closePointModal,
        openAddPointModal,
        closeAddPointModal,
        handleAddPointSubmit,
        handlePointsSelected,
    } = useAIConfig();


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
                    {/* 3. 将状态和回调直接传递给子组件 */}
                    <TypeSelector
                        selectedType={config.selectedType}
                        onTypeChange={(value) => updateConfig('selectedType', value)}
                    />
                    <DifficultySelector
                        selectedValue={config.selectedDifficulty}
                        onValueChange={(value) => updateConfig('selectedDifficulty', value)}
                    />
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}><span>*</span>出题数量：</h3>
                        <div className={styles.quantitySelector}>
                            <button className={styles.quantityButton} onClick={() => handleQuantityChange(-1)} disabled={config.quantity <= 1 || isGenerating}><i className="fas fa-minus"></i></button>
                            <span className={styles.quantityDisplay}>{config.quantity}</span>
                            <button className={styles.quantityButton} onClick={() => handleQuantityChange(1)} disabled={config.quantity >= 20 || isGenerating}><i className="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <KnowledgeScope
                        points={config.knowledgePoints}
                        onRemovePoint={(pointId) => updateConfig('knowledgePoints', config.knowledgePoints.filter(p => p.id !== pointId))}
                        onAddManually={openAddPointModal}
                        onSelectFromLibrary={openPointModal}
                    />
                    <SupplementaryContent
                        content={config.supplementaryContent}
                        onContentChange={(value) => updateConfig('supplementaryContent', value)}
                    />
                </div>

                <footer className={styles.footer}>
                    <button
                        className={`${styles.generateButton} ${isGenerating ? styles.stop : styles.start}`}
                        onClick={handleGenerate}
                    >
                        {isGenerating ? (
                            <motion.span><i className={`${styles.spinner} fas fa-spinner`}></i> 正在出题...</motion.span>
                        ) : (
                            <motion.span><i className="fas fa-play-circle"></i> 开始出题</motion.span>
                        )}
                    </button>
                </footer>
            </div>

            <KnowledgePointSelectionModal
                isOpen={isPointModalOpen}
                onClose={closePointModal}
                currentPoints={config.knowledgePoints}
                onSave={handlePointsSelected}
            />
            <InputModal
                isOpen={isAddPointModalOpen}
                onClose={closeAddPointModal}
                onSubmit={handleAddPointSubmit}
                title="手动添加知识点"
                label="知识点名称"
                placeholder="例如：递归的基线条件"
                confirmText="确认添加"
                validation={(value) => {
                    if (!value.trim()) return "知识点名称不能为空。";
                    if (config.knowledgePoints.some(p => p.title === value.trim())) return `知识点 "${value.trim()}" 已存在。`;
                    return null;
                }}
            />
        </>
    );
};

export default ConfigPanel;