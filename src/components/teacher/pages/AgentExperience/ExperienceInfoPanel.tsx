// src/components/teacher/pages/AgentExperience/ExperienceInfoPanel.tsx
"use client";
import React from 'react';
import { Button, Typography, Space, Tag, Tooltip } from 'antd';
import { CopyOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { AgentInfo } from '@/lib/agentExperienceData';
import styles from './ExperienceInfoPanel.module.css';

const { Title, Text } = Typography;

interface InfoRowProps {
    label: string;
    children: React.ReactNode;
    isCollapsed: boolean;
}
const InfoRow: React.FC<InfoRowProps> = ({ label, children, isCollapsed }) => (
  <div className={styles.infoRow}>
    <Text type="secondary" className={styles.infoLabel}>{label}</Text>
    {!isCollapsed && <div className={styles.infoValue}>{children}</div>}
  </div>
);

interface ExperienceInfoPanelProps {
  agent: AgentInfo;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const ExperienceInfoPanel: React.FC<ExperienceInfoPanelProps> = ({ agent, isCollapsed, onToggleCollapse }) => {
  return (
    <aside className={`${styles.panel} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.panelHeader}>
        {!isCollapsed && <Title level={5} style={{ margin: 0 }}>基本信息</Title>}
        <Button 
            className={styles.collapseButton}
            icon={isCollapsed ? <LeftOutlined /> : <RightOutlined />} 
            onClick={onToggleCollapse} 
        />
      </div>

      <div className={styles.panelContent}>
        <InfoRow label="ID" isCollapsed={isCollapsed}>
            <Tooltip title={agent.id} placement="left">
                <Text copyable={{ tooltips: ['复制', '已复制'] }}>{`bot-...${agent.id.slice(-6)}`}</Text>
            </Tooltip>
        </InfoRow>
        <InfoRow label="贡献者" isCollapsed={isCollapsed}>
          <Text>{agent.contributor}</Text>
        </InfoRow>
        <InfoRow label="更新时间" isCollapsed={isCollapsed}>
          <Text>{agent.updateTime}</Text>
        </InfoRow>
        <InfoRow label="使用模型" isCollapsed={isCollapsed}>
          <Tag color="blue">{agent.model}</Tag>
        </InfoRow>
        <InfoRow label="标签" isCollapsed={isCollapsed}>
          <Space size={[0, 8]} wrap>
            {agent.tags.map(tag => (
              <Tag key={tag.text} color={tag.type}>{tag.text}</Tag>
            ))}
          </Space>
        </InfoRow>
      </div>

      {!isCollapsed && (
        <div className={styles.panelFooter}>
            <Button icon={<CopyOutlined />} block>复制智能体</Button>
        </div>
      )}
    </aside>
  );
};

export default ExperienceInfoPanel;