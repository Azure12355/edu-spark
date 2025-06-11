// src/app/page.tsx
"use client"; // 因为要使用 useState 来管理 CourseAssistantWidget 的状态
import React, { useState } from 'react'; // 引入 useState

// 布局组件
import Header from '@/components/home/layout/Header/Header';
import FloatingSidebar from '@/components/common/FloatingSidebar/FloatingSidebar';
import Footer from '@/components/home/layout/Footer/Footer';

// 页面区域 (Sections) 组件
import HeroSection from '@/components/home/sections/HeroSection/HeroSection';
import HeroFeaturesSection from '@/components/home/sections/HeroFeaturesSection/HeroFeaturesSection';
import QuickExperienceSection from '@/components/home/sections/QuickExperienceSection/QuickExperienceSection';
import EduSparkScenariosSection from '@/components/home/sections/EduSparkScenariosSection/EduSparkScenariosSection';
import CoreTechnologySection from '@/components/home/sections/CoreTechnologySection/CoreTechnologySection';
import PlatformAdvantagesSection from '@/components/home/sections/PlatformAdvantagesSection/PlatformAdvantagesSection';
import TeachingLearningLoopSection from '@/components/home/sections/TeachingLearningLoopSection/TeachingLearningLoopSection';
import TechnicalArchitectureSection from '@/components/home/sections/TechnicalArchitectureSection/TechnicalArchitectureSection';
import ModelAndSubjectCatalogSection from '@/components/home/sections/ModelAndSubjectCatalogSection/ModelAndSubjectCatalogSection';

// 小组件 (Widgets)
import CourseAssistantWidget from '@/components/common/CourseAssistantWidget/CourseAssistantWidget'; // 引入 CourseAssistantWidget

export default function HomePage() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // 状态来控制 CourseAssistantWidget 的显隐

  const handleOpenChatbot = () => {
    setIsChatbotOpen(true);
  };

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  return (
    <>
      <Header />
      {/* 
        将打开聊天机器人的函数 (handleOpenChatbot) 作为 prop 传递给 FloatingSidebar。
        当 FloatingSidebar 内部的“售前咨询”按钮被点击时，会调用这个函数。
      */}
      <FloatingSidebar onConsultClick={handleOpenChatbot} />
      
      <main>
        <HeroSection />
        <HeroFeaturesSection />
        <QuickExperienceSection />
        <EduSparkScenariosSection />
        <CoreTechnologySection />
        <PlatformAdvantagesSection />
        <TeachingLearningLoopSection />
        <TechnicalArchitectureSection />
        <ModelAndSubjectCatalogSection />
        {/* 
          您可以继续在这里添加网站的其他 Section 组件。
          例如：
          - 资质与认证 (QualificationsAndCertificationsSection)
          - 全行业云上增长新动力 (CloudGrowthMomentumSection)
          - 上火山引擎，用豆包大模型 (CallToActionSection)
        */}
      </main>
      
      <Footer />

      {/* 
        渲染 CourseAssistantWidget。
        它的显示与否 (`isOpen`) 由本组件 (HomePage) 的 isChatbotOpen 状态控制。
        同时，将关闭浮窗的函数 (handleCloseChatbot) 传递给 CourseAssistantWidget，
        以便 CourseAssistantWidget 内部的关闭按钮可以调用它来改变 isChatbotOpen 状态。
      */}
      <CourseAssistantWidget isOpen={isChatbotOpen} onClose={handleCloseChatbot} />
    </>
  );
}