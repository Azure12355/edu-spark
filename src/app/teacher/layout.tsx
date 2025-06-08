// src/app/(teacher)/layout.tsx
"use client";
import React, { useState } from 'react';
import TeacherHeader from '@/components/teacher/layout/TeacherHeader';
import TeacherSider from '@/components/teacher/layout/TeacherSider';
import FloatingSidebar from '@/components/common/FloatingSidebar/FloatingSidebar';
import CourseAssistantWidget from '@/components/widgets/CourseAssistantWidget/CourseAssistantWidget';
import styles from './layout.module.css';
import { usePathname } from 'next/navigation'; // 引入 usePathname

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const handleOpenChatbot = () => setIsChatbotOpen(true);
  const handleCloseChatbot = () => setIsChatbotOpen(false);

  const pathname = usePathname();
  // 判断当前是否是智能体体验中心页面
  const isAgentExperiencePage = pathname.includes('/teacher/agent-experience');

  return (
    <div className={styles.teacherLayout}>
      <TeacherHeader />
      <div className={styles.mainWrapper}>
        {/* 在智能体体验中心页面不显示默认的 Sider */}
        {!isAgentExperiencePage && <TeacherSider />}
        {/* 
          为 main 标签应用样式，但移除 padding，
          让子页面(如体验中心)可以100%填充
        */}
        <main className={styles.contentWrapper} style={{ padding: isAgentExperiencePage ? 0 : 24 }}>
          {children}
          {/* 在智能体体验中心页面不显示悬浮球 */}
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