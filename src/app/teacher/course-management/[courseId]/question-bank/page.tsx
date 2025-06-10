// src/app/teacher/course-management/[courseId]/question-bank/page.tsx
"use client";
import React, { useState } from 'react';
import { Button, Tabs, Typography } from 'antd';
import { BulbOutlined, UnorderedListOutlined, PlusOutlined, FolderOpenOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './page.module.css';
import QuestionListPanel from '@/components/teacher/pages/QuestionBank/QuestionListPanel';
import AIGenerationPanel from '@/components/teacher/pages/QuestionBank/AIGenerationPanel';
import CreateQuestionPanel from '@/components/teacher/pages/QuestionBank/CreateQuestionPanel';
// --- 新增 ---
import FolderManagementPanel from '@/components/teacher/pages/QuestionBank/FolderManagementPanel'; // 1. 引入新组件

const { Title } = Typography;

const QuestionBankPage: React.FC = () => {
    // --- 修改: 默认显示题目管理 ---
    const [activeTab, setActiveTab] = useState('list'); 

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

    // --- 修改: 调整Tab顺序并添加新Tab ---
    const tabItems = [
        {
            label: <><UnorderedListOutlined /> 题目管理</>,
            key: 'list',
            children: <QuestionListPanel />,
        },
        {
            label: <><FolderOpenOutlined /> 文件夹管理</>, // 2. 添加文件夹管理Tab
            key: 'folders',
            children: <FolderManagementPanel />,
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