"use client";

import React, { useState } from 'react';
import DashboardSidebar from '@/components/teacher/layout/DashboardSidebar';
import DashboardHeader from '@/components/teacher/layout/DashboardHeader';
import FloatingSidebar from '@/components/common/FloatingSidebar/FloatingSidebar';
import CourseAssistantWidget from '@/components/widgets/CourseAssistantWidget/CourseAssistantWidget';
import styles from './AppLayout.module.css';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleOpenChatbot = () => {
    setIsChatbotOpen(true);
  };

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  return (
    <div className={styles.appLayout}>
      <DashboardSidebar />
      <div className={styles.mainWrapper}>
        <DashboardHeader />
        <main className={styles.content}>
          {children}
        </main>
      </div>
      <FloatingSidebar onConsultClick={handleOpenChatbot} />
      <CourseAssistantWidget isOpen={isChatbotOpen} onClose={handleCloseChatbot} />
    </div>
  );
}