// src/app/(home)/page.tsx
"use client";
import React from 'react';

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

export default function HomePage() {
  return (
    // 移除 Header, Footer, FloatingSidebar 和 CourseAssistantWidget
    // 它们现在由 src/app/(home)/layout.tsx 管理
    <>
      <HeroSection />
      <HeroFeaturesSection />
      <QuickExperienceSection />
      <EduSparkScenariosSection />
      <CoreTechnologySection />
      <PlatformAdvantagesSection />
      <TeachingLearningLoopSection />
      <TechnicalArchitectureSection />
      <ModelAndSubjectCatalogSection />
    </>
  );
}