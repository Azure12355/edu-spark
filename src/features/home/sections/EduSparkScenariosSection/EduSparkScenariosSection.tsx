// src/components/sections/EduSparkScenariosSection/EduSparkScenariosSection.tsx
"use client";
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './EduSparkScenariosSection.module.css';

// 为 EduSpark 的核心功能定义图标
const IconLessonPlan = () => <span className={styles.relatedProductIcon} style={{background: '#D1E4FF', color: '#1664FF', fontWeight:'bold'}}>案</span>;
const IconAutoGrade = () => <span className={styles.relatedProductIcon} style={{background: '#D9F7BE', color: '#52C41A', fontWeight:'bold'}}>批</span>;
const IconAnalysis = () => <span className={styles.relatedProductIcon} style={{background: '#FFF7E6', color: '#FA8C16', fontWeight:'bold'}}>析</span>;
const IconInteractive = () => <span className={styles.relatedProductIcon} style={{background: '#FFE8E6', color: '#F5222D', fontWeight:'bold'}}>练</span>;


interface Scenario {
  id: string;
  tabName: string;
  title: string;
  descriptionPoints: string[];
  relatedFeatures: { icon: React.ReactNode; name: string }[];
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

const scenariosData: Scenario[] = [
  {
    id: 'it-training',
    tabName: '编程与IT实训',
    title: '为计算机科学打造的智能实训平台',
    descriptionPoints: [
      "自动生成从基础到进阶的编程题目，覆盖多种主流编程语言。",
      "AI 助教实时分析代码，提供精准的错误定位和优化建议。",
      "模拟真实企业项目环境，培养学生解决复杂问题的工程能力。",
    ],
    relatedFeatures: [
      { icon: <IconAutoGrade />, name: '代码自动批阅' },
      { icon: <IconInteractive />, name: '在线编程练习' },
      { icon: <IconAnalysis />, name: '学情分析看板' },
    ],
    imageSrc: '/images/DoubaoScenariosSection/8j7nxi49pry_ai模块-场景-智能座舱.png',
    imageAlt: '编程与IT实训场景',
    imageWidth: 580,
    imageHeight: 400,
  },
  {
    id: 'language-learning',
    tabName: '语言学习',
    title: '全天候 AI 口语陪练伙伴',
    descriptionPoints: [
      "提供沉浸式对话场景，模拟真实交流环境，告别“哑巴外语”。",
      "实时语法纠错与发音评测，让每一次开口都有显著进步。",
      "根据CEFR标准，智能推荐学习内容和练习，定制个人成长路径。",
    ],
    relatedFeatures: [
        { icon: <IconInteractive />, name: '情景对话生成' },
        { icon: <IconAutoGrade />, name: '智能纠错' },
        { icon: <IconLessonPlan />, name: '个性化推荐' },
    ],
    imageSrc: '/images/DoubaoScenariosSection/2yn2bl8vchw_ai模块-场景-在线教育.png',
    imageAlt: '语言学习场景',
    imageWidth: 580,
    imageHeight: 400,
  },
  {
    id: 'k12-tutoring',
    tabName: 'K12 学科辅导',
    title: '点亮每个孩子的智慧火花',
    descriptionPoints: [
        "针对数理化难题，提供分步式解题思路，培养学生逻辑思维。",
        "海量题库按知识点精细分类，可针对薄弱环节进行专项练习。",
        "自动生成学情报告，帮助老师和家长全面掌握学生学习状况。"
    ],
    relatedFeatures: [
        { icon: <IconLessonPlan />, name: '智能教案生成' },
        { icon: <IconAnalysis />, name: '学情分析看板' },
        { icon: <IconInteractive />, name: '在线练习' },
    ],
    imageSrc: '/images/DoubaoScenariosSection/ptdfhl78eb_ai模块-场景-智能终端.png',
    imageAlt: 'K12学科辅导场景',
    imageWidth: 580,
    imageHeight: 400,
  },
  {
    id: 'corporate-training',
    tabName: '企业员工培训',
    title: '助力组织构建高效学习型团队',
    descriptionPoints: [
        "快速将内部知识库、规章制度转化为互动式培训课程。",
        "模拟客户服务、销售沟通等业务场景，提升员工实战技能。",
        "通过在线考核与能力评估，量化培训效果，识别高潜人才。",
    ],
    relatedFeatures: [
        { icon: <IconLessonPlan />, name: '知识库接入' },
        { icon: <IconInteractive />, name: '情景模拟' },
        { icon: <IconAutoGrade />, name: '智能考核' },
    ],
    imageSrc: '/images/DoubaoScenariosSection/d4mgrghk7sg_ai模块-场景-营销提效.png',
    imageAlt: '企业员工培训场景',
    imageWidth: 580,
    imageHeight: 400,
  },
];

// 动画变体
const sectionOverallVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.1 } },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const tabsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const tabButtonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardContentVariants = {
  initial: (direction: 'left' | 'right') => ({
    x: direction === 'left' ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: (direction: 'left' | 'right') => ({
    x: direction === 'left' ? -300 : 300,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  }),
};

const cardTextItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


const EduSparkScenariosSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(scenariosData[0].id);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  const activeScenario = useMemo(() => 
    scenariosData.find(scenario => scenario.id === activeTabId) || scenariosData[0],
    [activeTabId]
  );

  const handleTabClick = (newTabId: string) => {
    const currentIndex = scenariosData.findIndex(s => s.id === activeTabId);
    const newIndex = scenariosData.findIndex(s => s.id === newTabId);
    if (newIndex > currentIndex) {
      setSlideDirection('left');
    } else if (newIndex < currentIndex) {
      setSlideDirection('right');
    }
    setActiveTabId(newTabId);
  };

  return (
    <motion.section
      className={styles.scenariosSection}
      variants={sectionOverallVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container">
        <motion.h2
          className={`section-title-global text-center ${styles.mainSectionTitle}`}
          variants={titleVariants}
        >
          EduSpark 应用场景
        </motion.h2>
        <motion.p
          className={`text-center ${styles.sectionSubtitle}`}
          variants={titleVariants}
          custom={0.1}
        >
          从课堂到职场，EduSpark 为各类教学场景提供强大的 AI 驱动解决方案。
        </motion.p>

        <motion.div className={styles.tabsContainer} variants={tabsContainerVariants}>
          {scenariosData.map(scenario => (
            <motion.button
              key={scenario.id}
              className={`${styles.tabButton} ${activeTabId === scenario.id ? styles.active : ''}`}
              onClick={() => handleTabClick(scenario.id)}
              variants={tabButtonVariants}
              whileHover={{ y: -2, color: 'var(--ve-primary-blue)' }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {scenario.tabName}
              {activeTabId === scenario.id && (
                <motion.div className={styles.activeTabIndicator} layoutId="activeTabIndicatorEduSpark" />
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className={styles.cardContainerWrapper}>
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={activeScenario.id}
              className={styles.scenarioCard}
              custom={slideDirection}
              variants={cardContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div className={styles.cardTextContent} variants={{visible: {transition: {staggerChildren: 0.1}}}}>
                <motion.h3 className={styles.cardTitle} variants={cardTextItemVariants}>{activeScenario.title}</motion.h3>
                <motion.ul className={styles.descriptionList} variants={cardTextItemVariants}>
                  {activeScenario.descriptionPoints.map((point, i) => (
                    <li key={i}><i className="fas fa-check-circle"></i> {point}</li>
                  ))}
                </motion.ul>
                <motion.h4 className={styles.relatedProductsTitle} variants={cardTextItemVariants}>核心功能支持</motion.h4>
                <motion.div className={styles.relatedProductsList} variants={cardTextItemVariants}>
                  {activeScenario.relatedFeatures.map((feature, i) => (
                    <span key={i} className={styles.relatedProductItem}>
                      {feature.icon} {feature.name}
                    </span>
                  ))}
                </motion.div>
                <motion.div className={styles.cardButtons} variants={cardTextItemVariants}>
                  <a href="/student/assignment/plaza" className={`${styles.cardBtn} ${styles.primaryBtn}`}>体验该场景</a>
                  <a href="#" className={`${styles.cardBtn} ${styles.secondaryBtn}`}>查看详情</a>
                </motion.div>
              </motion.div>
              <motion.div className={styles.cardImageWrapper} variants={cardTextItemVariants} custom={0.2}>
                <Image
                  src={activeScenario.imageSrc}
                  alt={activeScenario.imageAlt}
                  width={activeScenario.imageWidth}
                  height={activeScenario.imageHeight}
                  className={styles.scenarioImage}
                  priority
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default EduSparkScenariosSection;