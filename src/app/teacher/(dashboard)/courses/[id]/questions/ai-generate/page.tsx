// src/app/teacher/(dashboard)/courses/[id]/questions/ai-generate/page.tsx
"use client";
import React, { useState, useMemo } from 'react';
import styles from './ai-generate.module.css';
import ConfigPanel from '@/components/teacher/course-management/ai-generate/ConfigPanel';
import ResultsPanel from '@/components/teacher/course-management/ai-generate/ResultsPanel';
import { QuestionDifficulty, QuestionType } from '@/constants/enums';
import { useToast } from '@/hooks/useToast';
import { useAIGeneratedQuestionsStore } from '@/store/aiGeneratedQuestionsStore';
import InputModal from "@/components/common/InputModal/InputModal";
// BugFix: 导入知识点相关类型和数据
import { KnowledgePoint, KnowledgePointType } from '@/types/knowledge';
import { useSyllabusStore } from '@/store/syllabusStore';
import KnowledgePointSelectionModal from '@/components/teacher/course-management/ai-generate/ConfigPanel/KnowledgePointSelectionModal';

// 辅助函数，用于从 syllabusData 中根据标题查找初始知识点
const findInitialPoints = (titles: string[], syllabus: any[]): KnowledgePoint[] => {
    const points: KnowledgePoint[] = [];
    const titleSet = new Set(titles);

    for (const chapter of syllabus) {
        for (const section of chapter.sections) {
            for (const point of section.points) {
                if (titleSet.has(point.title)) {
                    points.push(point as KnowledgePoint);
                }
            }
        }
    }
    return points;
};

export default function AIGeneratePage() {
    const questions = useAIGeneratedQuestionsStore((state) => state.questions);
    const { syllabus } = useSyllabusStore();
    const showToast = useToast();

    // BugFix: 将状态类型改为 KnowledgePoint[] 并使用辅助函数初始化
    const [knowledgePoints, setKnowledgePoints] = useState<KnowledgePoint[]>(() =>
        findInitialPoints(['布尔运算基础', 'Python逻辑非not', 'Python逻辑或or'], syllabus)
    );
    const [selectedTypes, setSelectedTypes] = useState<Set<QuestionType>>(new Set([QuestionType.SINGLE_CHOICE]));
    const [selectedDifficulty, setSelectedDifficulty] = useState<QuestionDifficulty>(QuestionDifficulty.EASY);
    const [supplementaryContent, setSupplementaryContent] = useState('');
    const [isPointModalOpen, setIsPointModalOpen] = useState(false);
    const [isAddPointModalOpen, setIsAddPointModalOpen] = useState(false);

    const handleTypeChange = (type: QuestionType) => {
        setSelectedTypes(prev => {
            const newSet = new Set(prev);
            if (newSet.size > 1 && newSet.has(type)) {
                newSet.delete(type);
            } else {
                newSet.add(type);
            }
            return newSet;
        });
    };

    // BugFix: onRemovePoint 参数改为 pointId
    const handleRemovePoint = (pointIdToRemove: string) => {
        setKnowledgePoints(prev => prev.filter(p => p.id !== pointIdToRemove));
    };

    // BugFix: 手动添加时创建一个完整的 KnowledgePoint 对象
    const handleAddPointSubmit = (newPointTitle: string) => {
        const trimmedTitle = newPointTitle.trim();
        if (knowledgePoints.some(p => p.title === trimmedTitle)) {
            showToast({ message: `知识点 "${trimmedTitle}" 已存在！`, type: 'warning' });
            return;
        }
        const newPoint: KnowledgePoint = {
            id: `manual-${Date.now()}`,
            title: trimmedTitle,
            type: KnowledgePointType.CORE, // 默认为核心
        };
        setKnowledgePoints(prev => [...prev, newPoint]);
        showToast({ message: '添加成功！', type: 'success' });
    };

    // BugFix: 从模态框保存时，直接设置 KnowledgePoint[]
    const handlePointsSelected = (newPoints: KnowledgePoint[]) => {
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
                    if (knowledgePoints.some(p => p.title === value.trim())) return `知识点 "${value.trim()}" 已存在。`;
                    return null;
                }}
            />
        </div>
    );
}