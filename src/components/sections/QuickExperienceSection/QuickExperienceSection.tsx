// src/components/sections/QuickExperienceSection/QuickExperienceSection.tsx
import React from 'react';
import Image from 'next/image';
import Button from '../../common/Button/Button';
import styles from './QuickExperienceSection.module.css';

const apiFeatures = [
  { icon: "/images/QuickExperience/模型选择.png", title: "模型选择", description: "多种模态模型体验，开箱即用" },
  { icon: "/images/QuickExperience/模型推理.png", title: "模型推理", description: "支持在线和批量推理，灵活适配" },
  { icon: "/images/QuickExperience/模型精调.png", title: "模型精调", description: "支持SFT精调，直接偏好学习等" },
  { icon: "/images/QuickExperience/模型评测.png", title: "模型评测", description: "准确评估性能，系统感知模型表现" },
  { icon: "/images/QuickExperience/prompt优化.png", title: "Prompt调优", description: "轻松打造精准Prompt，高效优化" },
  { icon: "/images/QuickExperience/应用实验室.png", title: "应用实验室", description: "多种开箱方式，搭建企业级应用" },
];

const QuickExperienceSection: React.FC = () => {
  return (
    <section className={`section-padding ${styles.quickExperienceSection}`}>
      <div className="container">
        <h2 className="section-title-global text-center">极速体验火山方舟</h2>
        <div className={styles.experienceColumns}>
          <div className={styles.experienceCol}>
            <h3>极速体验模型</h3>
            <p>体验全模型，领取超大免费权益。每款豆包大语言模型50万Tokens免费额度，企业用户参与协作计划可获得500万Tokens免费额度</p>
            <Button variant="primary" href="#">立即体验</Button>
            <div className={styles.featureBox}>
              <h4>免费额度</h4>
              <p className={styles.largeText}>50 <span className={styles.smallText}>万Tokens/豆包语言模型</span></p>
              <h4>企业客户权益</h4>
              <p className={styles.largeText}>500 <span className={styles.smallText}>万Tokens/天</span></p>
              <h4>主力模型价格低至</h4>
              <p className={styles.highlightPrice}>0.8 <span className={styles.smallText}>元/百万Tokens</span></p>
              <h4>多模态大模型</h4>
              <p>支持<span className="text-blue">文本</span>、<span className="text-blue">语音</span>、<span className="text-blue">视觉</span></p>
              {/* <div className={styles.featureBoxImageContainer}>
                <Image 
                    src="https://via.placeholder.com/400x250/F0F4FF/666666?text=Model+Features" 
                    alt="Model Features" 
                    width={350} 
                    height={218}
                    className={styles.featureBoxImg}
                />
              </div> */}
            </div>
          </div>
          <div className={styles.experienceCol}>
            <h3>API构建应用</h3>
            <p>平台提供模型精调、推理、评测等全方位功能与服务，提供联网内容等丰富插件功能、知识库与智能体集成能力，保障企业级AI应用落地</p>
            <Button variant="primary" href="#">立即使用</Button>
            <div className={styles.apiFeaturesGrid}>
              {apiFeatures.map((feature, index) => (
                <div key={index} className={styles.apiFeatureItem}>
                  <Image 
                    src={`${feature.icon}`} 
                    alt={feature.title}
                    width={32}
                    height={32}
                    className={styles.apiFeatureIcon}
                  />
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickExperienceSection;