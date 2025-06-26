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

export default function AIGeneratePage() {
    // --- 核心修改：从 Store 获取题目数据和操作 ---
    const questions = useAIGeneratedQuestionsStore((state) => state.questions);

    // 配置项的状态保留在页面组件中，因为它们是“临时”的输入状态
    const [selectedTypes, setSelectedTypes] = useState<Set<QuestionType>>(new Set(['单选题']));
    const [selectedDifficulty, setSelectedDifficulty] = useState<QuestionDifficulty>('简单');
    const [knowledgePoints, setKnowledgePoints] = useState<string[]>(['布尔运算基础', 'Python逻辑非not', 'Python逻辑或or']);
    const [supplementaryContent, setSupplementaryContent] = useState('');
    const [isPointModalOpen, setIsPointModalOpen] = useState(false);
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
    const handleAddPointManually = () => {
        const newPoint = window.prompt('请输入要手动添加的知识点名称：');
        if (newPoint && newPoint.trim() !== '') {
            if (knowledgePoints.includes(newPoint.trim())) {
                showToast({ message: `知识点 "${newPoint}" 已存在！`, type: 'warning' });
            } else {
                setKnowledgePoints(prev => [...prev, newPoint.trim()]);
                showToast({ message: '添加成功！', type: 'success' });
            }
        }
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
                    onAddManually={handleAddPointManually}
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
        </div>
    );
}