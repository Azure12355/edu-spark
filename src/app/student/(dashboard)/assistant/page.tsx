// src/app/student/(dashboard)/assistant/page.tsx
import React from 'react';
import AssistantContainer from '../../../../components/student/component/assistant/AssistantContainer'; // 引入新的容器组件

export default function AgentAssistantPage() {
    return (
        // 页面现在非常干净，只负责渲染一个容器
        <AssistantContainer />
    );
}