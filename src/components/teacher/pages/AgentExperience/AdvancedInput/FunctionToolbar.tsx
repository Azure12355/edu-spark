// src/components/teacher/pages/AgentExperience/AdvancedInput/FunctionToolbar.tsx
"use client";
import React from 'react';
import { Button, Space } from 'antd';
import { BulbOutlined, ExperimentOutlined, CodeOutlined, SearchOutlined, FilePptOutlined, AppstoreOutlined } from '@ant-design/icons';
import styles from './FunctionToolbar.module.css';

const functions = [
  { icon: <BulbOutlined />, text: '深度思考' },
  { icon: <ExperimentOutlined />, text: '分析研究' },
  { icon: <CodeOutlined />, text: '代码模式' },
  { icon: <SearchOutlined />, text: '联网搜索' },
  { icon: <FilePptOutlined />, text: 'PPT创作' },
  { icon: <AppstoreOutlined />, text: '指令中心' },
];

const FunctionToolbar: React.FC = () => {
  return (
    <div className={styles.toolbarWrapper}>
      <Space size="middle" wrap>
        {functions.map((func) => (
          <Button key={func.text} className={styles.funcButton} icon={func.icon}>
            {func.text}
          </Button>
        ))}
      </Space>
    </div>
  );
};

export default FunctionToolbar;