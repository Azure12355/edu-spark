// src/components/teacher/pages/AgentExperience/ExperienceSider.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { Button, Typography, Collapse, Tooltip } from 'antd';
import { PlusOutlined, ClockCircleOutlined, AppstoreOutlined, FireOutlined } from '@ant-design/icons';
import type { AgentInfo, ConversationHistory } from '@/lib/agentExperienceData';
import styles from './ExperienceSider.module.css';

const { Text } = Typography;
const { Panel } = Collapse;

interface ExperienceSiderProps {
  currentAgentId: string;
  agents: AgentInfo[];
  history: ConversationHistory[];
}

const ExperienceSider: React.FC<ExperienceSiderProps> = ({ currentAgentId, agents, history }) => {
  return (
    <aside className={styles.sider}>
      <div className={styles.siderHeader}>
        <Button type="primary" icon={<PlusOutlined />} block>
          创建新对话
        </Button>
      </div>

      <div className={styles.siderContent}>
        <Collapse
          defaultActiveKey={['recent', 'apps']}
          ghost
          expandIconPosition="end"
          className={styles.collapseContainer}
        >
          <Panel
            header={
              <div className={styles.panelHeader}>
                <ClockCircleOutlined /> 最近对话
              </div>
            }
            key="recent"
          >
            <div className={styles.historyList}>
              {history.map((item) => (
                <Tooltip key={item.id} title={item.title} placement="right">
                  <Link href={`/teacher/agent-experience/${item.agentId}?hist=${item.id}`} className={styles.historyItem}>
                    <Text ellipsis>{item.title}</Text>
                  </Link>
                </Tooltip>
              ))}
            </div>
          </Panel>

          <Panel
            header={
              <div className={styles.panelHeader}>
                <AppstoreOutlined /> 应用广场
              </div>
            }
            key="apps"
          >
            <div className={styles.agentList}>
              {agents.map((agent) => (
                <Link
                  key={agent.id}
                  href={`/teacher/agent-experience/${agent.id}`}
                  className={`${styles.agentItem} ${currentAgentId === agent.id ? styles.active : ''}`}
                >
                  <span className={styles.agentIcon}>{agent.icon}</span>
                  <div className={styles.agentInfo}>
                    <Text ellipsis className={styles.agentName}>
                      {agent.name}
                      {agent.tags.some(t => t.text.includes('多模态')) && <FireOutlined style={{ color: '#FAAD14', marginLeft: 4 }}/>}
                    </Text>
                  </div>
                </Link>
              ))}
              <Link href="/teacher/agent-square" className={styles.moreAppsLink}>
                更多开放应用...
              </Link>
            </div>
          </Panel>
        </Collapse>
      </div>
    </aside>
  );
};

export default ExperienceSider;