// src/components/sections/HeroFeaturesSection/HeroFeaturesSection.tsx
import React from 'react';
import Link from 'next/link';
import styles from './HeroFeaturesSection.module.css';

interface FeatureItem {
  title: string;
  description: string;
  linkText: string;
  href: string;
  tag?: string; // 可选的标签，如 "限时特惠"
}

const features: FeatureItem[] = [
  {
    title: "大模型特惠",
    description: "限量秒杀！19.9元起1000万tokens",
    linkText: "立即抢购",
    href: "#",
    tag: "限时特惠"
  },
  {
    title: "定价与计费",
    description: "各模型定价与计费方式",
    linkText: "了解详情",
    href: "#"
  },
  {
    title: "体验中心",
    description: "DeepSeek-R1/0528 上线",
    linkText: "免费体验",
    href: "#",
    tag: "上新"
  },
  {
    title: "API文档",
    description: "快速入门与调用",
    linkText: "查看文档",
    href: "#"
  }
];

const HeroFeaturesSection: React.FC = () => {
  return (
    <section className={styles.heroFeaturesSection}>
      <div className={`container ${styles.featuresContainer}`}>
        {features.map((feature, index) => (
          <Link href={feature.href} key={index} className={styles.featureCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              {feature.tag && <span className={styles.featureTag}>{feature.tag}</span>}
            </div>
            <p className={styles.featureDescription}>{feature.description}</p>
            <div className={styles.featureLink}>
              {feature.linkText} <i className="fas fa-chevron-right"></i>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HeroFeaturesSection;