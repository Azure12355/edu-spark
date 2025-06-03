// src/app/page.tsx
import Header from '@/components/layout/Header/Header';
import FloatingSidebar from '@/components/layout/FloatingSidebar/FloatingSidebar';
import HeroSection from '@/components/sections/HeroSection/HeroSection';
import HeroFeaturesSection from '@/components/sections/HeroFeaturesSection/HeroFeaturesSection'; // 新增引入
import QuickExperienceSection from '@/components/sections/QuickExperienceSection/QuickExperienceSection';
import SystemCapacitySection from '@/components/sections/SystemCapacitySection/SystemCapacitySection';
import CapabilitySupportSection from '@/components/sections/CapabilitySupportSection/CapabilitySupportSection';
import PricingSection from '@/components/sections/PricingSection/PricingSection';
import Footer from '@/components/layout/Footer/Footer';
import ProductDiagramSection from '@/components/sections/ProductDiagramSection/ProductDiagramSection';
import DoubaoScenariosSection from '@/components/sections/DoubaoScenariosSection/DoubaoScenariosSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <FloatingSidebar />
      <main>
        <HeroSection />
        <HeroFeaturesSection /> {/* 在 HeroSection 下方添加新组件 */}
        <QuickExperienceSection />
        <DoubaoScenariosSection/>
        <SystemCapacitySection />
        <CapabilitySupportSection />
        <ProductDiagramSection />
        <PricingSection />
        {/* ... 其他 section ... */}
      </main>
      <Footer />
    </>
  );
}