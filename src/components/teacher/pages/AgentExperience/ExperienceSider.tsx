// src/components/teacher/pages/AgentExperience/ExperienceSider.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { Button, Typography, Collapse, Tooltip, Avatar } from 'antd';
import { PlusOutlined, ClockCircleOutlined, AppstoreOutlined, FireOutlined, UserOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { AgentInfo, ConversationHistory } from '@/lib/agentExperienceData';
import styles from './ExperienceSider.module.css';

const { Text } = Typography;
const { Panel } = Collapse;

interface ExperienceSiderProps {
  currentAgentId: string;
  agents: AgentInfo[];
  history: ConversationHistory[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLoadHistory: (historyId: string) => void;
}

const ExperienceSider: React.FC<ExperienceSiderProps> = ({ currentAgentId, agents, history, isCollapsed, onToggleCollapse, onLoadHistory }) => {
  // 根据当前智能体过滤对话历史
  const agentSpecificHistory = history.filter(h => h.agentId === currentAgentId);
    
  return (
    <aside className={`${styles.sider} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.siderHeader}>
        <Button type="primary" icon={<PlusOutlined />} block>
          {!isCollapsed && '创建新对话'}
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
                <ClockCircleOutlined /> {!isCollapsed && '最近对话'}
              </div>
            }
            key="recent"
            collapsible={isCollapsed ? 'disabled' : undefined}
          >
            <div className={styles.historyList}>
              {agentSpecificHistory.map((item) => (
                <Tooltip key={item.id} title={item.title} placement="right">
                  <div onClick={() => onLoadHistory(item.id)} className={styles.historyItem}>
                    <Text ellipsis>{isCollapsed ? ' ' : item.title}</Text>
                  </div>
                </Tooltip>
              ))}
            </div>
          </Panel>

          <Panel
            header={
              <div className={styles.panelHeader}>
                <AppstoreOutlined /> {!isCollapsed && '应用广场'}
              </div>
            }
            key="apps"
            collapsible={isCollapsed ? 'disabled' : undefined}
          >
            <div className={styles.agentList}>
              {agents.map((agent) => (
                <Tooltip key={agent.id} title={agent.name} placement="right">
                    <Link
                    href={`/teacher/agent-experience/${agent.id}`}
                    className={`${styles.agentItem} ${currentAgentId === agent.id ? styles.active : ''}`}
                    >
                    <span className={styles.agentIcon}>{agent.icon}</span>
                    {!isCollapsed && (
                        <div className={styles.agentInfo}>
                            <Text ellipsis className={styles.agentName}>
                                {agent.name}
                                {agent.tags.some(t => t.text.includes('多模态')) && <FireOutlined style={{ color: '#FAAD14', marginLeft: 4 }}/>}
                            </Text>
                        </div>
                    )}
                    </Link>
                </Tooltip>
              ))}
              {!isCollapsed && (
                <Link href="/teacher/agent-square" className={styles.moreAppsLink}>
                    更多开放应用...
                </Link>
              )}
            </div>
          </Panel>
        </Collapse>
      </div>
      
      <div className={styles.siderFooter}>
        {!isCollapsed && (
            <div className={styles.userInfo}>
                <Avatar icon={<UserOutlined />} />
                <Text style={{ fontWeight: 500 }}>王老师</Text>
            </div>
        )}
        <Button 
            className={styles.collapseButton}
            icon={isCollapsed ? <RightOutlined /> : <LeftOutlined />} 
            onClick={onToggleCollapse}
        />
      </div>
    </aside>
  );
};

export default ExperienceSider;