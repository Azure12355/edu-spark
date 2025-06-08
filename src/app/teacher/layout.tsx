// src/app/teacher/layout.tsx
"use client";
import React, { useState } from 'react';
import TeacherHeader from '@/components/teacher/layout/TeacherHeader';
import TeacherSider from '@/components/teacher/layout/TeacherSider';
import FloatingSidebar from '@/components/common/FloatingSidebar/FloatingSidebar';
import CourseAssistantWidget from '@/components/widgets/CourseAssistantWidget/CourseAssistantWidget';
import styles from './layout.module.css';
import { usePathname } from 'next/navigation';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const handleOpenChatbot = () => setIsChatbotOpen(true);
  const handleCloseChatbot = () => setIsChatbotOpen(false);

  const pathname = usePathname();
  const isAgentExperiencePage = pathname.includes('/teacher/agent-experience');

  // 根据页面类型决定 contentWrapper 的样式和内边距
  const contentWrapperClass = isAgentExperiencePage 
    ? styles.contentWrapper 
    : `${styles.contentWrapper} ${styles.scrollable}`;
  
  const contentWrapperStyle = { 
    padding: isAgentExperiencePage ? 0 : '24px' 
  };

  return (
    <div className={styles.teacherLayout}>
      <TeacherHeader />
      <div className={styles.mainWrapper}>
        {!isAgentExperiencePage && <TeacherSider />}
        <main className={contentWrapperClass} style={contentWrapperStyle}>
          {children}
          {!isAgentExperiencePage && (
            <>
              <FloatingSidebar onConsultClick={handleOpenChatbot} />
              <CourseAssistantWidget isOpen={isChatbotOpen} onClose={handleCloseChatbot} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}