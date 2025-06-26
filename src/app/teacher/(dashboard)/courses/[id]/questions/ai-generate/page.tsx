// src/app/teacher/(dashboard)/courses/[id]/questions/ai-generate/page.tsx
"use client";
import React, { useState } from 'react';
import styles from './ai-generate.module.css';
import ConfigPanel from '@/components/teacher/course-management/ai-generate/ConfigPanel';
import ResultsPanel from '@/components/teacher/course-management/ai-generate/ResultsPanel';
import { QuestionDifficulty, QuestionType } from '@/lib/data/questionBankData';
import KnowledgePointSelectionModal from '@/components/teacher/course-management/ai-generate/ConfigPanel/KnowledgePointSelectionModal';
import { useToast } from '@/hooks/useToast';
// --- 核心修改：导入并使用新的 Store ---
import { useAIGeneratedQuestionsStore } from '@/store/aiGeneratedQuestionsStore';
import InputModal from "@/components/common/InputModal/InputModal";

export default function AIGeneratePage() {
    // --- 核心修改：从 Store 获取题目数据和操作 ---
    const questions = useAIGeneratedQuestionsStore((state) => state.questions);

    // 配置项的状态保留在页面组件中，因为它们是“临时”的输入状态
    const [selectedTypes, setSelectedTypes] = useState<Set<QuestionType>>(new Set(['单选题']));
    const [selectedDifficulty, setSelectedDifficulty] = useState<QuestionDifficulty>('简单');
    const [knowledgePoints, setKnowledgePoints] = useState<string[]>(['布尔运算基础', 'Python逻辑非not', 'Python逻辑或or']);
    const [supplementaryContent, setSupplementaryContent] = useState('');
    const [isPointModalOpen, setIsPointModalOpen] = useState(false);

    const [isAddPointModalOpen, setIsAddPointModalOpen] = useState(false);
    const showToast = useToast();

    // ... (保留所有 handle... 函数)
    const handleTypeChange = (type: QuestionType) => {
        setSelectedTypes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(type)) {
                if(newSet.size > 1) newSet.delete(type);
            } else {
                newSet.add(type);
            }
            return newSet;
        });
    };
    const handleRemovePoint = (pointToRemove: string) => {
        setKnowledgePoints(prev => prev.filter(p => p !== pointToRemove));
    };
    // --- 核心修改：使用模态框的提交回调函数 ---
    const handleAddPointSubmit = (newPoint: string) => {
        if (knowledgePoints.includes(newPoint.trim())) {
            // 这个验证逻辑也可以移到 InputModal 的 validation prop 中
            showToast({ message: `知识点 "${newPoint}" 已存在！`, type: 'warning' });
            return; // 阻止关闭模态框
        }
        setKnowledgePoints(prev => [...prev, newPoint.trim()]);
        showToast({ message: '添加成功！', type: 'success' });
    };
    const handlePointsSelected = (newPoints: string[]) => {
        setKnowledgePoints(newPoints);
        showToast({ message: `已更新关联知识点 (${newPoints.length}个)`, type: 'info' });
    };


    return (
        <div className={styles.pageContainer}>
            <aside className={styles.leftPanel}>
                <ConfigPanel
                    selectedTypes={selectedTypes}
                    onTypeChange={handleTypeChange}
                    selectedDifficulty={selectedDifficulty}
                    onDifficultyChange={setSelectedDifficulty}
                    knowledgePoints={knowledgePoints}
                    onRemovePoint={handleRemovePoint}
                    supplementaryContent={supplementaryContent}
                    onContentChange={setSupplementaryContent}
                    onAddManually={() => setIsAddPointModalOpen(true)}
                    onSelectFromLibrary={() => setIsPointModalOpen(true)}
                />
            </aside>
            <main className={styles.rightPanel}>
                {/* --- 核心修改：直接传递 questions --- */}
                <ResultsPanel questions={questions} />
            </main>

            <KnowledgePointSelectionModal
                isOpen={isPointModalOpen}
                onClose={() => setIsPointModalOpen(false)}
                currentPoints={knowledgePoints}
                onSave={handlePointsSelected}
            />

            <InputModal
                isOpen={isAddPointModalOpen}
                onClose={() => setIsAddPointModalOpen(false)}
                onSubmit={handleAddPointSubmit}
                title="手动添加知识点"
                label="知识点名称"
                placeholder="例如：递归的基线条件"
                confirmText="确认添加"
                validation={(value) => {
                    if (!value.trim()) return "知识点名称不能为空。";
                    if (knowledgePoints.includes(value.trim())) return `知识点 "${value.trim()}" 已存在。`;
                    return null;
                }}
            />
        </div>
    );
}