// src/app/(teacher)/layout.tsx
"use client";
import React, { useState } from 'react';
import TeacherHeader from '@/components/teacher/layout/TeacherHeader';
import TeacherSider from '@/components/teacher/layout/TeacherSider';
import FloatingSidebar from '@/components/common/FloatingSidebar/FloatingSidebar';
import CourseAssistantWidget from '@/components/widgets/CourseAssistantWidget/CourseAssistantWidget';
import styles from './layout.module.css'; // 引入新的布局样式

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const handleOpenChatbot = () => setIsChatbotOpen(true);
  const handleCloseChatbot = () => setIsChatbotOpen(false);

  return (
    <div className={styles.teacherLayout}>
      <TeacherHeader />
      <div className={styles.mainWrapper}>
        <TeacherSider />
        <main className={styles.contentWrapper}>
          {children}
          <FloatingSidebar onConsultClick={handleOpenChatbot} />
          <CourseAssistantWidget isOpen={isChatbotOpen} onClose={handleCloseChatbot} />
        </main>
      </div>
    </div>
  );
}