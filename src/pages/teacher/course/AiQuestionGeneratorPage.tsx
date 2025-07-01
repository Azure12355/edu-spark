"use client";
import React, { useState, useMemo } from 'react';
import styles from './AiQuestionGenerator.module.css';
import ConfigPanel from '@/features/teacher/course/course-management/sub-features/ai-question-generator/components/ConfigPanel';
import ResultsPanel from '@/features/teacher/course/course-management/sub-features/ai-question-generator/components/ResultsPanel';
import { QuestionDifficulty, QuestionType } from '@/shared/constants/enums';
import { useToast } from '@/shared/hooks/useToast';
import { useAIGeneratedQuestionsStore } from '@/features/teacher/course/course-management/sub-features/ai-question-generator/store/aiGeneratedQuestionsStore';
import InputModal from "@/shared/components/ui/InputModal/InputModal";
// BugFix: 导入知识点相关类型和数据
import { KnowledgePoint, KnowledgePointType } from '@/shared/types/knowledge';
import { useSyllabusStore } from '@/features/teacher/course/course-management/sub-features/syllabus/store/syllabusStore';
import KnowledgePointSelectionModal from '@/features/teacher/course/course-management/sub-features/ai-question-generator/components/ConfigPanel/KnowledgePointSelectionModal';

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

export default function AiQuestionGeneratorPage() {
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