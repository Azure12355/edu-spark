// src/components/sections/TeachingLearningLoopSection/TeachingLearningLoopSection.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TeachingLearningLoopSection.module.css';

const StepIcon = ({ color = '#4E5969' }: { color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={color} viewBox="0 0 16 16" style={{ marginRight: '8px', flexShrink: 0 }}>
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
    </svg>
);


interface LoopStep {
  id: string;
  tabName: string;
  title: string;
  description: string;
  points: string[];
  imageSrc: string;
  imageAlt: string;
}

const loopData: LoopStep[] = [
  {
    id: 'step1-prepare',
    tabName: 'Step 1: 智能备课',
    title: 'AI 辅助备课，效率倍增',
    description: '教师只需上传课程大纲或关键知识点，EduSpark 即可自动生成结构化的教案、生动的讲解文稿和配套的实训任务。',
    points: [
        "从本地知识库精准提取内容，确保教学的专业性与准确性。",
        "自动生成多样化题型，包括选择、填空、简答乃至编程题。",
        "支持教师对AI生成内容进行微调，实现人机协同，打造精品课程。",
    ],
    imageSrc: '/images/FullLifecycleSecuritySection/adub0ayscfv_大图-数据搞保密.png',
    imageAlt: '智能备课流程示意图',
  },
  {
    id: 'step2-practice',
    tabName: 'Step 2: 互动练习',
    title: '沉浸式练习，即时反馈',
    description: '学生可随时进入在线实训环境，针对性地完成练习。AI 助教提供 7x24 小时的在线答疑与辅导。',
    points: [
        "根据学生历史表现，智能推荐练习题目，实现个性化学习。",
        "对提交的答案进行实时批改，指出错误并提供详尽的修正建议。",
        "通过互动式问答，加深学生对知识点的理解与记忆。",
    ],
    imageSrc: '/images/FullLifecycleSecuritySection/re9lrtb3kn_大图-环境强隔离.png',
    imageAlt: '学生互动练习场景示意图',
  },
  {
    id: 'step3-analyze',
    tabName: 'Step 3: 学情分析',
    title: '数据驱动洞察，教学优化',
    description: '系统自动汇总全体学生的学习数据，生成可视化的学情分析报告，帮助教师精准掌握教学效果。',
    points: [
        "自动统计答题正确率、高频错误点，定位教学中的重点和难点。",
        "分析学生知识图谱，清晰展示每个学生的知识掌握情况。",
        "为教师提供科学的教学调整建议，持续优化教学策略。",
    ],
    imageSrc: '/images/FullLifecycleSecuritySection/dr549oliz6d_大图-操作可审计.png',
    imageAlt: '学情数据分析看板示意图',
  }
];

const TeachingLearningLoopSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(loopData[0].id);
  const [direction, setDirection] = useState(0); 

  const handleTabClick = (tabId: string) => {
    const currentIndex = loopData.findIndex(s => s.id === tabId);
    const previousIndex = loopData.findIndex(s => s.id === activeTabId);
    setDirection(currentIndex > previousIndex ? 1 : (currentIndex < previousIndex ? -1 : 0));
    setActiveTabId(tabId);
  };

  const activeStep = loopData.find(step => step.id === activeTabId) || loopData[0];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <section className={`section-padding ${styles.securitySection}`}>
      <div className="container">
        <motion.h2 
          className={`section-title-global text-center ${styles.mainSectionTitle}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          教学相长，智能驱动的教学闭环
        </motion.h2>
        <motion.p 
          className={`text-center ${styles.sectionSubtitle}`}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          从备课到分析，EduSpark 助力教学质量全链路提升。
        </motion.p>

        <div className={styles.tabsContainer}>
          {loopData.map((step, index) => (
            <motion.button
              key={step.id}
              className={`${styles.tabButton} ${activeTabId === step.id ? styles.active : ''}`}
              onClick={() => handleTabClick(step.id)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index + 0.2, ease: "easeOut" }}
            >
              {step.tabName}
              {activeTabId === step.id && (
                <motion.div className={styles.activeTabIndicator} layoutId="activeLoopIndicator" />
              )}
            </motion.button>
          ))}
        </div>
        
        <div className={styles.cardContentWrapper}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeTabId}
              className={styles.featureCard}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              <div className={styles.cardTextContent}>
                <motion.h3 
                    className={styles.cardTitle}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
                >
                    {activeStep.title}
                </motion.h3>
                <motion.p 
                    className={styles.cardDescription}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.4 }}
                >
                    {activeStep.description}
                </motion.p>
                <ul className={styles.descriptionList}>
                  {activeStep.points.map((point, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                    >
                      <StepIcon color="var(--ve-primary-blue)" /> {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.div 
                className={styles.cardImageWrapper}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={activeStep.imageSrc}
                  alt={activeStep.imageAlt}
                  width={520}
                  height={300}
                  className={styles.featureImage}
                  priority={true}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div 
          className={styles.actionButtonsContainer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <a href="#" className={`${styles.actionBtn} ${styles.primaryBtn}`}>立即体验教学闭环</a>
          <a href="#" className={`${styles.actionBtn} ${styles.secondaryBtn}`}>查看功能白皮书</a>
        </motion.div>

      </div>
    </section>
  );
};

export default TeachingLearningLoopSection;