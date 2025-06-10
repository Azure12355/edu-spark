// src/app/teacher/course-management/[courseId]/question-bank/page.tsx
"use client";
import React, { useState } from 'react';
import { Button, Tabs, Typography } from 'antd';
import { BulbOutlined, UnorderedListOutlined, PlusOutlined, FolderOpenOutlined, SettingOutlined, SnippetsOutlined } from '@ant-design/icons';
import styles from './page.module.css';
import AIGenerationPanel from '@/components/teacher/pages/QuestionBank/AIGenerationPanel';
import CreateQuestionPanel from '@/components/teacher/pages/QuestionBank/CreateQuestionPanel';
import UnifiedQuestionBankPanel from '@/components/teacher/pages/QuestionBank/FolderManagementPanel';
// --- 新增 ---
import ExamManagementWrapper from '@/components/teacher/pages/QuestionBank/ExamManagementWrapper'; 

const { Title } = Typography;

const QuestionBankPage: React.FC = () => {
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

    const tabItems = [
        {
            label: <><FolderOpenOutlined /> 题库管理</>,
            key: 'folders',
            children: <UnifiedQuestionBankPanel />,
        },
        {
            label: <><PlusOutlined /> 新建题目</>,
            key: 'create',
            children: <CreateQuestionPanel />,
        },
        // --- 新增题单管理Tab ---
        {
            label: <><SnippetsOutlined /> 题单管理</>,
            key: 'exam-settings',
            children: <ExamManagementWrapper />,
        },
        {
            label: <><BulbOutlined /> AI 出题</>,
            key: 'ai',
            children: <AIGenerationPanel />,
        }
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