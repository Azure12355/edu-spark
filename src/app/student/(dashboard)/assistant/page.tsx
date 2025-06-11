// src/app/student/assistant/page.tsx
import React from 'react';
import AgentAssistantChat from '@/components/student/component/assistant/AgentAssistantChat/AgentAssistantChat';

export default function AgentAssistantPage() {
    return (
        // 这个组件将充满父容器（student-content-area）
        <AgentAssistantChat />
    );
}