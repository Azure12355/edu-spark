// src/app/teacher/(dashboard)/courses/[id]/questions/ai-generate/page.tsx
"use client";
import React, { useState } from 'react';
import styles from './ai-generate.module.css';
import ConfigPanel from '@/components/teacher/course-management/ai-generate/ConfigPanel';
import ResultsPanel from '@/components/teacher/course-management/ai-generate/ResultsPanel';
import { AIGeneratedQuestion, aiGeneratedQuestionsData } from '@/lib/data/aiGeneratedQuestionsData';
import { QuestionDifficulty, QuestionType } from '@/lib/data/questionBankData';
// 核心新增：导入新模态框和 Toast Hook
import KnowledgePointSelectionModal from '@/components/teacher/course-management/ai-generate/ConfigPanel/KnowledgePointSelectionModal';
import { useToast } from '@/hooks/useToast';

export default function AIGeneratePage() {
    const [generatedQuestions, setGeneratedQuestions] = useState<AIGeneratedQuestion[]>(aiGeneratedQuestionsData);

    // --- 状态管理区 ---
    const [selectedTypes, setSelectedTypes] = useState<Set<QuestionType>>(new Set(['单选题']));
    const [selectedDifficulty, setSelectedDifficulty] = useState<QuestionDifficulty>('简单');
    const [knowledgePoints, setKnowledgePoints] = useState<string[]>(['布尔运算基础', 'Python逻辑非not', 'Python逻辑或or']);
    const [supplementaryContent, setSupplementaryContent] = useState('');
    // 核心新增：控制模态框的显示状态
    const [isPointModalOpen, setIsPointModalOpen] = useState(false);
    const showToast = useToast();

    // --- 逻辑处理函数区 ---
    const handleTypeChange = (type: QuestionType) => {
        setSelectedTypes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(type)) {
                if(newSet.size > 1) newSet.delete(type); // 保证至少有一个被选中
            } else {
                newSet.add(type);
            }
            return newSet;
        });
    };

    const handleRemovePoint = (pointToRemove: string) => {
        setKnowledgePoints(prev => prev.filter(p => p !== pointToRemove));
    };

    // 核心新增：手动添加知识点逻辑
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

    // 核心新增：从模态框保存知识点选择的逻辑
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
                    // 核心新增：传递事件处理器
                    onAddManually={handleAddPointManually}
                    onSelectFromLibrary={() => setIsPointModalOpen(true)}
                />
            </aside>
            <main className={styles.rightPanel}>
                <ResultsPanel questions={generatedQuestions} />
            </main>

            {/* 核心新增：渲染模态框组件 */}
            <KnowledgePointSelectionModal
                isOpen={isPointModalOpen}
                onClose={() => setIsPointModalOpen(false)}
                currentPoints={knowledgePoints}
                onSave={handlePointsSelected}
            />
        </div>
    );
}