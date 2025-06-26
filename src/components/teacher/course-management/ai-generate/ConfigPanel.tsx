// src/components/teacher/course-management/ai-generate/ConfigPanel.tsx
"use client";
import React, { useState } from 'react';
import styles from './ConfigPanel.module.css';
import { QuestionDifficulty, QuestionType } from '@/lib/data/questionBankData';

import TypeSelector from './ConfigPanel/TypeSelector';
import DifficultySelector from './ConfigPanel/DifficultySelector';
import KnowledgeScope from './ConfigPanel/KnowledgeScope';
import SupplementaryContent from './ConfigPanel/SupplementaryContent';

// 更新 Props 接口
interface ConfigPanelProps {
    selectedTypes: Set<QuestionType>;
    onTypeChange: (type: QuestionType) => void;
    selectedDifficulty: QuestionDifficulty;
    onDifficultyChange: (difficulty: QuestionDifficulty) => void;
    knowledgePoints: string[];
    onRemovePoint: (point: string) => void;
    supplementaryContent: string;
    onContentChange: (content: string) => void;
    // 新增 Props
    onAddManually: () => void;
    onSelectFromLibrary: () => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = (props) => {
    const [activeTab, setActiveTab] = useState('knowledge');

    return (
        <div className={styles.panel}>
            <header className={styles.header}>
                <i className={`fas fa-wand-magic-sparkles ${styles.headerIcon}`}></i>
                <h2 className={styles.headerTitle}>AI 智能出题</h2>
            </header>

            <div className={styles.scrollableBody}>
                <div className={styles.tabs}>
                    <button className={`${styles.tabButton} ${activeTab === 'knowledge' ? styles.active : ''}`} onClick={() => setActiveTab('knowledge')}>知识点出题</button>
                    <button className={`${styles.tabButton} ${activeTab === 'text' ? styles.active : ''}`} onClick={() => setActiveTab('text')}>文本出题</button>
                </div>

                <TypeSelector selectedTypes={props.selectedTypes} onTypeChange={props.onTypeChange} />
                <DifficultySelector selectedDifficulty={props.selectedDifficulty} onDifficultyChange={props.onDifficultyChange} />
                <KnowledgeScope
                    points={props.knowledgePoints}
                    onRemovePoint={props.onRemovePoint}
                    // 传递事件处理器
                    onAddManually={props.onAddManually}
                    onSelectFromLibrary={props.onSelectFromLibrary}
                />
                <SupplementaryContent content={props.supplementaryContent} onContentChange={props.onContentChange} />

            </div>

            <footer className={styles.footer}>
                <button className={styles.generateButton}>
                    <i className="fas fa-spinner fa-spin"></i> 停止出题
                </button>
            </footer>
        </div>
    );
};
export default ConfigPanel;