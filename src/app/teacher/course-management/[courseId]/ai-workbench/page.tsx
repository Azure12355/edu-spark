// src/app/teacher/course-management/[courseId]/ai-workbench/page.tsx
"use client";
import React from 'react';
import AIWorkbenchChatPanel from '@/components/teacher/pages/CourseManagement/AIWorkbenchChatPanel';
import AIToolbox from '@/components/teacher/pages/CourseManagement/AIToolbox';

// Wrapper div for flex layout
const AIWorkbenchPage: React.FC = () => {
    return (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            <AIWorkbenchChatPanel />
            <AIToolbox />
        </div>
    );
};

export default AIWorkbenchPage;