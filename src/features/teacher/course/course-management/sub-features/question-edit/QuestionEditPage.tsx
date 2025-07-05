// [!file src/features/teacher/course/course-management/sub-features/question-edit/QuestionEditPage.tsx]
"use client";

import React, {useMemo} from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './QuestionEditPage.module.css';

// 1. 导入核心 Hook 和所有需要的子组件，这次确保 QuestionConfigPanel 被包含在内
import { useQuestionEdit } from './hooks/useQuestionEdit';
import QuestionEditHeader from './components/QuestionEditHeader/QuestionEditHeader';
import QuestionConfigPanel from './components/QuestionConfigPanel/QuestionConfigPanel'; // 【修正】恢复配置面板
import StemEditor from './components/StemEditor/StemEditor';
import AnswerEditor from './components/AnswerEditor/AnswerEditor';
import AnalysesEditor from './components/AnalysesEditor/AnalysesEditor';
import KnowledgePointModal from './components/KnowledgePointModal/KnowledgePointModal';

// 状态 UI 组件
const LoadingState: React.FC = () => (
    <div className={styles.stateOverlay}>
        <span><i className="fas fa-spinner fa-spin"></i> 正在加载题目数据...</span>
    </div>
);

const SavingState: React.FC = () => (
    <div className={styles.stateOverlay}>
        <span><i className="fas fa-spinner fa-spin"></i> 正在保存更改...</span>
    </div>
);


export default function QuestionEditPage() {
    // 2. 调用 Hook 获取所有数据和逻辑
    const {
        question,
        syllabusForModal,
        mode,
        isLoading,
        isSaving,
        isKnowledgePointModalOpen,
        handleFieldChange,
        handleSave,
        openKnowledgePointModal,
        closeKnowledgePointModal,
    } = useQuestionEdit();

    // 2. 【核心修复】将 useMemo 调用移到组件的顶层
    const currentPointsForModal = useMemo(() => {
        // 如果 question 不存在，返回一个空数组，确保 useMemo 总是返回一个确定的类型
        if (!question) {
            return [];
        }
        return question.knowledgePoints.map(p => ({ id: p.knowledgePointId }));
    }, [question]); // 依赖项改为 question，当整个 question 对象变化时重新计算


    if (isLoading || !question) {
        return <LoadingState />;
    }



    return (
        <div className={styles.pageContainer}>
            {isSaving && <SavingState />}

            <QuestionEditHeader
                mode={mode}
                isSaving={isSaving}
                onSave={handleSave}
            />

            {/* 3. 【核心修正】恢复经典的两栏式布局 */}
            <div className={styles.mainContent}>
                {/* 左侧配置面板 */}
                <motion.aside
                    className={styles.configPanelWrapper}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <QuestionConfigPanel
                        question={question}
                        onUpdate={handleFieldChange}
                        onEditPoints={openKnowledgePointModal} // 将打开模态框的动作传递给配置面板
                    />
                </motion.aside>

                {/* 右侧内容编辑器区域 */}
                <motion.main
                    className={styles.editorPanelWrapper}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <StemEditor
                        value={question.stem}
                        onChange={(v) => handleFieldChange('stem', v)}
                    />
                    <AnswerEditor
                        question={question}
                        onUpdate={handleFieldChange}
                    />
                    <AnalysesEditor
                        values={question.analyses}
                        onChange={(v) => handleFieldChange('analyses', v)}
                    />
                </motion.main>
            </div>

            {/* 4. 知识点选择模态框 */}
            <KnowledgePointModal
                isOpen={isKnowledgePointModalOpen}
                onClose={closeKnowledgePointModal}
                syllabusData={syllabusForModal}
                currentPoints={currentPointsForModal} // 使用计算好的 prop
                onSave={(newPointIds) => {
                    // 这里的逻辑也需要适配 useQuestionEdit 的 handleFieldChange
                    handleFieldChange('knowledgePoints', newPointIds.map(id => ({ id })) as any);
                }}
            />
        </div>
    );
}