// [!file src/features/teacher/course/course-management/sub-features/ai-question-generator/components/ResultPanel/ResultsPanel.tsx]
"use client";
import React from 'react';
import styles from './ResultsPanel.module.css';

// 1. 只导入需要的子组件，不再需要任何类型或数据
import ResultsPanelHeader from './ResultsPanelHeader/ResultsPanelHeader';
import StatsGrid from './StatsGrid/StatsGrid';
import QuestionList from './QuestionList/QuestionList';


const ResultsPanel: React.FC = () => {
    // 2. 组件内部不再需要任何 Hook 或状态管理逻辑！
    return (
        <div className={styles.panel}>
            {/* 3. 子组件不再接收任何 props */}
            <ResultsPanelHeader />
            <StatsGrid />
            <QuestionList />
        </div>
    );
};

export default ResultsPanel;