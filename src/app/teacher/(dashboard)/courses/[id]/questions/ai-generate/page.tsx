// src/app/teacher/(dashboard)/courses/[id]/questions/ai-generate/page.tsx
"use client";
import React, { useState } from 'react';
import styles from './ai-generate.module.css';
import ConfigPanel from '@/components/teacher/course-management/ai-generate/ConfigPanel';
import ResultsPanel from '@/components/teacher/course-management/ai-generate/ResultsPanel';
// 核心修改 1：从新的枚举文件中导入类型
import { QuestionDifficulty, QuestionType } from '@/constants/enums';
import KnowledgePointSelectionModal from '@/components/teacher/course-management/ai-generate/ConfigPanel/KnowledgePointSelectionModal';
import { useToast } from '@/hooks/useToast';
import { useAIGeneratedQuestionsStore } from '@/store/aiGeneratedQuestionsStore';
import InputModal from "@/components/common/InputModal/InputModal";

export default function AIGeneratePage() {
    const questions = useAIGeneratedQuestionsStore((state) => state.questions);

    // 核心修改 2：更新状态的类型注解和初始值
    const [selectedTypes, setSelectedTypes] = useState<Set<QuestionType>>(new Set([QuestionType.SINGLE_CHOICE]));
    const [selectedDifficulty, setSelectedDifficulty] = useState<QuestionDifficulty>(QuestionDifficulty.EASY);

    // 其他状态保持不变
    const [knowledgePoints, setKnowledgePoints] = useState<string[]>(['布尔运算基础', 'Python逻辑非not', 'Python逻辑或or']);
    const [supplementaryContent, setSupplementaryContent] = useState('');
    const [isPointModalOpen, setIsPointModalOpen] = useState(false);
    const [isAddPointModalOpen, setIsAddPointModalOpen] = useState(false);
    const showToast = useToast();

    // 核心修改 3：更新 handleTypeChange 的参数类型
    const handleTypeChange = (type: QuestionType) => {
        setSelectedTypes(prev => {
            const newSet = new Set(prev);
            // 允许多选，如果已存在则移除，否则添加
            if (newSet.has(type)) {
                // 如果只剩一个，则不允许取消选中
                if (newSet.size > 1) {
                    newSet.delete(type);
                }
            } else {
                newSet.add(type);
            }
            return newSet;
        });
    };

    // 其他事件处理函数保持不变
    const handleRemovePoint = (pointToRemove: string) => {
        setKnowledgePoints(prev => prev.filter(p => p !== pointToRemove));
    };

    const handleAddPointSubmit = (newPoint: string) => {
        if (knowledgePoints.includes(newPoint.trim())) {
            showToast({ message: `知识点 "${newPoint}" 已存在！`, type: 'warning' });
            return;
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