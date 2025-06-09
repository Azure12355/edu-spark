// src/app/teacher/course-management/[courseId]/question-bank/page.tsx
"use client";
import React, { useState } from 'react';
import { Button, Tabs, Typography } from 'antd';
import { BulbOutlined, UnorderedListOutlined, PlusOutlined, FolderOpenOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './page.module.css';
import QuestionListPanel from '@/components/teacher/pages/QuestionBank/QuestionListPanel';
import AIGenerationPanel from '@/components/teacher/pages/QuestionBank/AIGenerationPanel';

const { Title } = Typography;

const QuestionBankPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('ai');

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
            label: <><UnorderedListOutlined /> 题目管理</>,
            key: 'list',
            children: <QuestionListPanel />,
        },
        {
            label: <><PlusOutlined /> 新建题目</>,
            key: 'create',
            children: <div style={{ padding: 24 }}>新建题目功能开发中...</div>,
        },
        {
            label: <><BulbOutlined /> AI 出题</>,
            key: 'ai',
            children: <AIGenerationPanel />,
        },
        {
            label: <><FolderOpenOutlined /> 文件夹管理</>,
            key: 'folders',
            children: <div style={{ padding: 24 }}>文件夹管理功能开发中...</div>,
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
                    // --- 核心优化：将标题和按钮整合到 Tabs bar 中 ---
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