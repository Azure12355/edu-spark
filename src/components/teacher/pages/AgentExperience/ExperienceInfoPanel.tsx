// src/components/teacher/pages/AgentExperience/ExperienceInfoPanel.tsx
"use client";
import React from 'react';
import { Button, Typography, Space, Tag } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import type { AgentInfo } from '@/lib/agentExperienceData';
import styles from './ExperienceInfoPanel.module.css';

const { Title, Text } = Typography;

interface ExperienceInfoPanelProps {
  agent: AgentInfo;
}

const InfoRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className={styles.infoRow}>
    <Text type="secondary" className={styles.infoLabel}>{label}</Text>
    <div className={styles.infoValue}>{children}</div>
  </div>
);

const ExperienceInfoPanel: React.FC<ExperienceInfoPanelProps> = ({ agent }) => {
  return (
    <aside className={styles.panel}>
      <div className={styles.panelHeader}>
        <Title level={5} style={{ margin: 0 }}>基本信息</Title>
        <Button icon={<CopyOutlined />}>复制</Button>
      </div>

      <div className={styles.panelContent}>
        <InfoRow label="应用ID">
          <Text copyable={{ tooltips: ['复制', '已复制'] }}>{`bot-${agent.id}`}</Text>
        </InfoRow>
        <InfoRow label="贡献者">
          <Text>{agent.contributor}</Text>
        </InfoRow>
        <InfoRow label="更新时间">
          <Text>{agent.updateTime}</Text>
        </InfoRow>
        <InfoRow label="使用模型">
          <Tag color="blue">{agent.model}</Tag>
        </InfoRow>
        <InfoRow label="标签">
          <Space size={[0, 8]} wrap>
            {agent.tags.map(tag => (
              <Tag key={tag.text} color={tag.type}>{tag.text}</Tag>
            ))}
          </Space>
        </InfoRow>
      </div>
    </aside>
  );
};

export default ExperienceInfoPanel;