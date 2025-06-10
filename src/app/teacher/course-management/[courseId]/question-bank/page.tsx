// src/app/teacher/course-management/[courseId]/question-bank/page.tsx
"use client";
import React, { useState } from 'react';
import { Button, Tabs, Typography } from 'antd';
import { BulbOutlined, UnorderedListOutlined, PlusOutlined, FolderOpenOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './page.module.css';
// import QuestionListPanel from '@/components/teacher/pages/QuestionBank/QuestionListPanel'; // <-- 已删除
import AIGenerationPanel from '@/components/teacher/pages/QuestionBank/AIGenerationPanel';
import CreateQuestionPanel from '@/components/teacher/pages/QuestionBank/CreateQuestionPanel';
// --- [MERGE] 引入统一后的面板 ---
import FolderManagementPanelWrapper from '@/components/teacher/pages/QuestionBank/FolderManagementPanel';

const { Title } = Typography;

const QuestionBankPage: React.FC = () => {
    // --- [MERGE] 默认显示 "folders" Tab ---
    const [activeTab, setActiveTab] = useState('folders');

    const tabBarExtraContent = (
        <Button
            type="primary"
            icon={<BulbOutlined />}
            className={styles.aiButton}
            onClick={() => setActiveTab('ai')}
        >
            AI 一键出题
        </Button>
    );

    // --- [MERGE] 移除旧的题目管理和文件夹管理Tab，用一个统一的Tab代替 ---
    const tabItems = [
        {
            label: <><FolderOpenOutlined /> 题库管理</>,
            key: 'folders',
            children: <FolderManagementPanelWrapper />,
        },
        {
            label: <><PlusOutlined /> 新建题目</>,
            key: 'create',
            children: <CreateQuestionPanel />,
        },
        {
            label: <><BulbOutlined /> AI 出题</>,
            key: 'ai',
            children: <AIGenerationPanel />,
        },
        {
            label: <><SettingOutlined /> 出题设置</>,
            key: 'settings',
            children: <div style={{ padding: 24 }}>出题设置功能开发中...</div>,
        },
    ];

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.tabsWrapper}>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={tabItems}
                    tabPosition="top"
                    tabBarGutter={32}
                    tabBarExtraContent={{
                        left: <Title level={4} style={{ margin: 0, marginRight: 40 }}>课程题库</Title>,
                        right: tabBarExtraContent,
                    }}
                />
            </div>
        </div>
    );
};

export default QuestionBankPage;