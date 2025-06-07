// src/components/sections/PlatformAdvantagesSection/PlatformAdvantagesSection.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './PlatformAdvantagesSection.module.css';

const advantages = [
  {
    imgSrc: "/images/CapabilitySupportSection/ko8tg8v6oim_专业算法服务.png",
    title: "智能教研引擎",
    description: "内置强大的教育垂直领域AI模型，深度理解教学大纲与知识点，为教师提供高质量的自动化教案与习题生成服务。",
    points: ["教案一键生成", "多维度习题设计", "持续迭代优化"]
  },
  {
    imgSrc: "/images/CapabilitySupportSection/eh1igh65xgo_模型能力扩展.png",
    title: "个性化学习伴侣",
    description: "通过实时互动与学情追踪，为每位学生提供量身定制的练习与辅导，实现真正的因材施教。",
    points: ["7x24实时答疑", "自适应练习推荐", "知识点追踪与巩固"]
  },
  {
    imgSrc: "/images/CapabilitySupportSection/aujjhrreevu_高并发算力保障.png",
    title: "数据驱动教学洞察",
    description: "全方位、多维度地分析学情数据，将教学过程转化为可量化的指标，助力教学决策科学化。",
    points: ["自动化练习批改", "可视化学情报告", "精准识别教学难点"]
  },
  {
    imgSrc: "/images/CapabilitySupportSection/41f8r5ppl2n_安全可信会话无痕.png",
    title: "安全可信的教学环境",
    description: "采用多层级安全策略与数据加密技术，严格保护师生隐私与教学数据安全，营造纯净的教学环境。",
    points: ["教学数据隔离", "内容安全过滤", "保障师生隐私"]
  }
];

// Animation Variants
const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const PlatformAdvantagesSection: React.FC = () => {
  return (
    <motion.section
      className={`section-padding ${styles.platformAdvantagesSection}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <motion.h2
          className="section-title-global text-center"
          variants={titleVariants}
        >
          EduSpark 平台核心优势
        </motion.h2>
        <motion.div className={styles.capabilityCards} variants={sectionVariants}>
          {advantages.map((advantage, index) => (
            <motion.div key={index} className={styles.capabilityCard} variants={cardVariants}>
              <div className={styles.cardImageContainer}>
                <Image 
                  src={advantage.imgSrc} 
                  alt={advantage.title} 
                  width={200} 
                  height={100}
                  className={styles.cardImage}
                />
              </div>
              <h4>{advantage.title}</h4>
              <p>{advantage.description}</p>
              <ul>
                {advantage.points.map((point, pIndex) => (
                  <li key={pIndex}><i className="fas fa-check-circle"></i> {point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PlatformAdvantagesSection;