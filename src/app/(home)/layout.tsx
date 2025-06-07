// src/app/(home)/layout.tsx
"use client";
import React, { useState } from 'react';
import Header from '@/components/home/layout/Header/Header';
import Footer from '@/components/home/layout/Footer/Footer';
import FloatingSidebar from '@/components/common/FloatingSidebar/FloatingSidebar';
import CourseAssistantWidget from '@/components/widgets/CourseAssistantWidget/CourseAssistantWidget';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const handleOpenChatbot = () => setIsChatbotOpen(true);
  const handleCloseChatbot = () => setIsChatbotOpen(false);

  return (
    // 使用一个 div 包裹，并在这里应用 padding-top，以补偿全局样式的移除
    <div style={{ paddingTop: 'var(--ve-header-height, 60px)' }}>
      <Header />
      {/* 
        注意：这里的 FloatingSidebar 是门户专用的样式。
        教师端的布局将引用同一个组件，但我们会更新该组件，使其能适应两种不同风格。
        不过，根据新截图，教师端的浮动条与门户首页的完全不同，所以我们将专门为教师端更新它。
      */}
      <FloatingSidebar onConsultClick={handleOpenChatbot} />
      <main>{children}</main>
      <Footer />
      <CourseAssistantWidget isOpen={isChatbotOpen} onClose={handleCloseChatbot} />
    </div>
  );
}