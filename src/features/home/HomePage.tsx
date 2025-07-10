// src/app/KnowledgeDetailPage.tsx
"use client"; // 因为要使用 useState 来管理 CourseAssistantWidget 的状态
import React, { useState } from 'react'; // 引入 useState

// 布局组件
import FloatingSidebar from '@/shared/components/common/FloatingSidebar/FloatingSidebar';
import Footer from '@/features/home/layout/Footer/Footer';

// 页面区域 (Sections) 组件
import HeroSection from '@/features/home/sections/HeroSection/HeroSection';
import HeroFeaturesSection from '@/features/home/sections/HeroFeaturesSection/HeroFeaturesSection';
import QuickExperienceSection from '@/features/home/sections/QuickExperienceSection/QuickExperienceSection';
import EduSparkScenariosSection from '@/features/home/sections/EduSparkScenariosSection/EduSparkScenariosSection';
import CoreTechnologySection from '@/features/home/sections/CoreTechnologySection/CoreTechnologySection';
import PlatformAdvantagesSection from '@/features/home/sections/PlatformAdvantagesSection/PlatformAdvantagesSection';
import TeachingLearningLoopSection from '@/features/home/sections/TeachingLearningLoopSection/TeachingLearningLoopSection';
import TechnicalArchitectureSection from '@/features/home/sections/TechnicalArchitectureSection/TechnicalArchitectureSection';
import ModelAndSubjectCatalogSection from '@/features/home/sections/ModelAndSubjectCatalogSection/ModelAndSubjectCatalogSection';

// 小组件 (Widgets)
import CourseAssistantWidget from '@/shared/components/common/CourseAssistantWidget/CourseAssistantWidget';
import Header from "@/shared/components/common/Header/Header"; // 引入 CourseAssistantWidget

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

      <Footer/>

      <CourseAssistantWidget isOpen={isChatbotOpen} onClose={handleCloseChatbot} />
    </>
  );
}