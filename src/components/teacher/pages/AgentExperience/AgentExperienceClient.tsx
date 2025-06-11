// src/components/teacher/pages/AgentExperience/AgentExperienceClient.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AgentInfo, ConversationHistory, Message, mockConversations } from '@/lib/agentExperienceData';
import ExperienceSider from '@/components/teacher/pages/AgentExperience/ExperienceSider';
import ExperienceChatPanel from '@/components/teacher/pages/AgentExperience/ExperienceChatPanel';
import ExperienceInfoPanel from '@/components/teacher/pages/AgentExperience/ExperienceInfoPanel';
import styles from '@/app/teacher/agent-experience/[agentId]/page.module.css';

interface AgentExperienceClientProps {
  agent: AgentInfo;
  allAgents: AgentInfo[];
  history: ConversationHistory[];
}

const AgentExperienceClient: React.FC<AgentExperienceClientProps> = ({ agent, allAgents, history }) => {
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
  const [isInfoPanelCollapsed, setIsInfoPanelCollapsed] = useState(false);
  
  // 关键改动：确保 messages 的初始状态永远是一个有效的数组
  const [messages, setMessages] = useState<Message[]>([
      { id: 'init-assistant', role: 'assistant', content: agent.welcomeMessage, isComplete: true }
  ]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const historyId = searchParams.get('hist');
    if (historyId && mockConversations[historyId]) {
      setMessages([
          { id: 'init-assistant', role: 'assistant', content: agent.welcomeMessage, isComplete: true },
          ...mockConversations[historyId]
      ]);
    } else {
      setMessages([{ id: 'init-assistant', role: 'assistant', content: agent.welcomeMessage, isComplete: true }]);
    }
  }, [agent, searchParams]);
  
  const handleLoadHistory = (historyId: string) => {
    const loadedMessages = mockConversations[historyId] || [];
    setMessages([
        { id: 'init-assistant', role: 'assistant', content: agent.welcomeMessage, isComplete: true },
        ...loadedMessages
    ]);
  };

  return (
    <div className={styles.pageWrapper}>
      <ExperienceSider
        currentAgentId={agent.id}
        agents={allAgents}
        history={history}
        isCollapsed={isSiderCollapsed}
        onToggleCollapse={() => setIsSiderCollapsed(!isSiderCollapsed)}
        onLoadHistory={handleLoadHistory}
      />
      <ExperienceChatPanel
        agent={agent}
        messages={messages}
        setMessages={setMessages}
      />
      <ExperienceInfoPanel
        agent={agent}
        isCollapsed={isInfoPanelCollapsed}
        onToggleCollapse={() => setIsInfoPanelCollapsed(!isInfoPanelCollapsed)}
      />
    </div>
  );
};

export default AgentExperienceClient;