// src/components/teacher/pages/CourseManagement/AIToolbox.tsx
"use client";
import React from 'react';
import { Typography, Tabs, Tag } from 'antd';
import styles from './AIToolbox.module.css';

const { Title, Text } = Typography;

const aiTools = [
  {
    icon: '出',
    color: '#E3F2FD',
    textColor: '#1E88E5',
    title: 'AI出题',
    description: 'AI出题，全面高效，精准把握知识点',
  },
  {
    icon: '实',
    color: '#E0F2F1',
    textColor: '#00897B',
    title: 'AI实训',
    description: '一键发布实践任务，AI精准智能评估，覆盖多元教学场景',
  },
  {
    icon: '组',
    color: '#FFF3E0',
    textColor: '#FB8C00',
    title: 'AI组卷',
    description: '召唤智能组卷小助手，三步生成优质试卷',
    isNew: true,
  },
  {
    icon: '教',
    color: '#EDE7F6',
    textColor: '#5E35B1',
    title: 'AI教案',
    description: 'AI辅助，智能备课，智慧教学新选择',
  },
  {
    icon: '写',
    color: '#FCE4EC',
    textColor: '#D81B60',
    title: 'AI写作批阅',
    description: '基于人工智能技术，自动对学生的写作内容进行评分和反馈',
  },
  {
    icon: '课',
    color: '#E8F5E9',
    textColor: '#43A047',
    title: 'AI课件',
    description: '轻松一点，即刻创建专业级教学PPT',
  },
  {
    icon: '编',
    color: '#F1F8E9',
    textColor: '#7CB342',
    title: '智能编写',
    description: '多样主题，自定义风格，一键成文',
  },
];

const AIToolbox: React.FC = () => {
    return (
        <aside className={styles.toolboxContainer}>
            <div className={styles.toolboxHeader}>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        { key: '1', label: 'AI工具箱' },
                        { key: '2', label: '常用指令' },
                    ]}
                />
            </div>

            {aiTools.map(tool => (
                <div key={tool.title} className={styles.toolCard}>
                    <div className={styles.toolCardHeader}>
                        <div className={styles.toolInfo}>
                            <div className={styles.toolIcon} style={{backgroundColor: tool.color, color: tool.textColor}}>
                                {tool.icon}
                            </div>
                            <Title level={5} className={styles.toolTitle}>{tool.title}</Title>
                        </div>
                        {tool.isNew && <Tag color="error">NEW</Tag>}
                    </div>
                    <Text className={styles.toolDesc}>{tool.description}</Text>
                </div>
            ))}
        </aside>
    );
};

export default AIToolbox;