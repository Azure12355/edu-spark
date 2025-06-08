// src/app/teacher/agent-experience/[agentId]/page.tsx
// 这个文件是服务器组件，所以移除了 "use client"

import React from 'react';
import { notFound } from 'next/navigation';
import { agentInfos, conversationHistories } from '@/lib/agentExperienceData';
import AgentExperienceClient from '@/components/teacher/pages/AgentExperience/AgentExperienceClient';

interface AgentExperiencePageProps {
  params: {
    agentId: string;
  };
}

// generateStaticParams 可以在服务器组件中使用
export async function generateStaticParams() {
  return agentInfos.map((agent) => ({
    agentId: agent.id,
  }));
}

// 关键改动：将组件声明为 async，这样就可以在内部安全地访问 params
const AgentExperiencePage: React.FC<AgentExperiencePageProps> = async ({ params }) => {
  const { agentId } = params;
  const currentAgent = agentInfos.find((agent) => agent.id === agentId);

  // 如果找不到对应的智能体，显示 404 页面
  if (!currentAgent) {
    notFound();
  }

  // 将数据作为 props 传递给新的客户端组件
  return (
    <AgentExperienceClient
      agent={currentAgent}
      allAgents={agentInfos}
      history={conversationHistories}
    />
  );
};

export default AgentExperiencePage;