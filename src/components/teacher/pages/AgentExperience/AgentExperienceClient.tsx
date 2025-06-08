// src/components/teacher/pages/AgentExperience/AgentExperienceClient.tsx
"use client"; // 这个文件是客户端组件

import React from 'react';
import { AgentInfo, ConversationHistory } from '@/lib/agentExperienceData';
import ExperienceSider from '@/components/teacher/pages/AgentExperience/ExperienceSider';
import ExperienceChatPanel from '@/components/teacher/pages/AgentExperience/ExperienceChatPanel';
import ExperienceInfoPanel from '@/components/teacher/pages/AgentExperience/ExperienceInfoPanel';
// 引入页面样式
import styles from '@/app/teacher/agent-experience/[agentId]/page.module.css';

interface AgentExperienceClientProps {
  agent: AgentInfo;
  allAgents: AgentInfo[];
  history: ConversationHistory[];
}

const AgentExperienceClient: React.FC<AgentExperienceClientProps> = ({ agent, allAgents, history }) => {
  return (
    <div className={styles.pageWrapper}>
      <ExperienceSider
        currentAgentId={agent.id}
        agents={allAgents}
        history={history}
      />
      <ExperienceChatPanel agent={agent} />
      <ExperienceInfoPanel agent={agent} />
    </div>
  );
};

export default AgentExperienceClient;