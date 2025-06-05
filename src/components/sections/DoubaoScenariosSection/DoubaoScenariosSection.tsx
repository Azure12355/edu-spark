// src/components/sections/DoubaoScenariosSection/DoubaoScenariosSection.tsx
"use client";
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'; // 引入 AnimatePresence
import styles from './DoubaoScenariosSection.module.css';

// 假设的图标组件或路径 (与您提供的一致)
const IconDoubaoSmall = () => <span className={styles.relatedProductIcon} style={{background: 'linear-gradient(45deg, #FFD700, #FF69B4, #00BFFF)', color: 'white', fontWeight:'bold'}}>豆</span>;
const IconKouzi = () => <span className={styles.relatedProductIcon} style={{background: '#FF8C00', color: 'white', fontWeight:'bold'}}>扣</span>;
const IconHiAgentSmall = () => <span className={styles.relatedProductIcon} style={{background: '#50E3C2', color: 'black', fontWeight:'bold'}}>Hi</span>;
const IconLab = () => <span className={styles.relatedProductIcon} style={{background: '#E8E6FC', color: '#7B68EE', fontWeight:'bold'}}>验</span>;


interface Scenario {
  id: string;
  tabName: string;
  title: string;
  descriptionPoints: string[];
  relatedProducts: { icon: React.ReactNode; name: string }[];
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

const scenariosData: Scenario[] = [
  {
    id: 'smart-cockpit',
    tabName: '智能座舱',
    title: '智能座舱解决方案', // 标题更具体
    descriptionPoints: [
      "用车顾问：可基于车辆功能、行车知识、交规问答，配合RAG和抖音视频，提供准确和多样化的信息交互。",
      "POI推荐+行程助手：结合豆包大模型和抖音本地生活POI，提供智能的POI搜索和行程规划能力。",
      "AI副驾：结合多模资讯、抖音资讯，智能理解用户意图并且搜索相关新闻资讯、提供新闻总结和播报能力。",
    ],
    relatedProducts: [
      { icon: <IconDoubaoSmall />, name: '豆包大模型' },
      { icon: <IconKouzi />, name: '扣子' },
      { icon: <IconHiAgentSmall />, name: 'Hi Agent' },
      { icon: <IconLab />, name: '应用实验室' },
    ],
    imageSrc: '/images/DoubaoScenariosSection/8j7nxi49pry_ai模块-场景-智能座舱.png',
    imageAlt: '智能座舱演示',
    imageWidth: 580, // 调整尺寸以适应新布局
    imageHeight: 400,
  },
  {
    id: 'online-education',
    tabName: '在线教育',
    title: '个性化在线教育平台',
    descriptionPoints: [
      "拍照解题：通过图像理解和解题意图识别题目，解析更新点，快速匹配解题思路与方法，助力学生高效攻克难题。",
      "陪练助手：家长式记忆学习历程，依据过往数据调整陪练策略，针对性强化，给予个性化学习引导。",
      "虚拟课堂：模拟真实课堂场景，以丰富的专业储备设计互动环节，激发学生学习兴趣，提升知识吸收效果。",
    ],
    relatedProducts: [
        { icon: <IconDoubaoSmall />, name: '豆包大模型' },
        { icon: <IconKouzi />, name: '扣子' },
        { icon: <IconLab />, name: '应用实验室' },
    ],
    imageSrc: '/images/DoubaoScenariosSection/2yn2bl8vchw_ai模块-场景-在线教育.png',
    imageAlt: '在线教育演示',
    imageWidth: 580,
    imageHeight: 400,
  },
  { id: 'smart-terminal', tabName: '智能终端', title: '智能终端交互升级', descriptionPoints: ["多设备联动，提供无缝智能体验。", "个性化内容推荐与智能家居控制。"], relatedProducts: [{ icon: <IconDoubaoSmall />, name: '豆包大模型' }], imageSrc: '/images/DoubaoScenariosSection/ptdfhl78eb_ai模块-场景-智能终端.png', imageAlt: '智能终端', imageWidth:580, imageHeight:400 },
  { id: 'social-entertainment', tabName: '社交娱乐', title: '沉浸式社交娱乐体验', descriptionPoints: ["AI生成个性化虚拟形象与互动内容。", "智能匹配与推荐，拓展社交圈层。"], relatedProducts: [{ icon: <IconDoubaoSmall />, name: '豆包大模型' },{ icon: <IconKouzi />, name: '扣子' }], imageSrc: '/images/DoubaoScenariosSection/4wqfn41ee29_ai模块-场景-社交娱乐.png', imageAlt: '社交娱乐', imageWidth:580, imageHeight:400 },
  { id: 'smart-customer-service', tabName: '智能客服', title: '高效智能客服系统', descriptionPoints: ["7x24小时自动化应答，提升服务效率。", "精准理解用户意图，提供个性化解决方案。"], relatedProducts: [{ icon: <IconDoubaoSmall />, name: '豆包大模型' },{ icon: <IconHiAgentSmall />, name: 'Hi Agent' }], imageSrc: '/images/DoubaoScenariosSection/hb7235wif2_ai模块-场景-智能客服.png', imageAlt: '智能客服', imageWidth:580, imageHeight:400 },
  { id: 'marketing-efficiency', tabName: '营销提效', title: 'AI驱动营销效率革命', descriptionPoints: ["智能生成营销文案与创意素材。", "精准用户画像分析与自动化投放。"], relatedProducts: [{ icon: <IconDoubaoSmall />, name: '豆包大模型' }], imageSrc: '/images/DoubaoScenariosSection/d4mgrghk7sg_ai模块-场景-营销提效.png', imageAlt: '营销提效', imageWidth:580, imageHeight:400 },
  { id: 'consumer-retail', tabName: '消费零售', title: '智慧零售新模式', descriptionPoints: ["个性化商品推荐与智能导购。", "AI分析消费数据，优化库存与供应链。"], relatedProducts: [{ icon: <IconDoubaoSmall />, name: '豆包大模型' }], imageSrc: '/images/DoubaoScenariosSection/y0bmacehdud_ai模块-场景-电商零售.png', imageAlt: '消费零售', imageWidth:580, imageHeight:400 },
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
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }, // Smooth cubic bezier
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


const DoubaoScenariosSection: React.FC = () => {
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
      setSlideDirection('left'); // New content comes from right
    } else if (newIndex < currentIndex) {
      setSlideDirection('right'); // New content comes from left
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
          豆包大模型应用场景
        </motion.h2>
        <motion.p
          className={`text-center ${styles.sectionSubtitle}`}
          variants={titleVariants}
          custom={0.1} // for potential custom delay in variants if needed
        >
          丰富的应用场景和解决方案，满足多种业务需求
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
                <motion.div className={styles.activeTabIndicator} layoutId="activeTabIndicatorDoubao" />
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className={styles.cardContainerWrapper}>
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={activeScenario.id} // Key change triggers animation
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
                <motion.h4 className={styles.relatedProductsTitle} variants={cardTextItemVariants}>相关产品</motion.h4>
                <motion.div className={styles.relatedProductsList} variants={cardTextItemVariants}>
                  {activeScenario.relatedProducts.map((product, i) => (
                    <span key={i} className={styles.relatedProductItem}>
                      {product.icon} {product.name}
                    </span>
                  ))}
                </motion.div>
                <motion.div className={styles.cardButtons} variants={cardTextItemVariants}>
                  <a href="#" className={`${styles.cardBtn} ${styles.primaryBtn}`}>立即咨询</a>
                  <a href="#" className={`${styles.cardBtn} ${styles.secondaryBtn}`}>模型详情</a>
                </motion.div>
              </motion.div>
              <motion.div className={styles.cardImageWrapper} variants={cardTextItemVariants} custom={0.2}>
                <Image
                  src={activeScenario.imageSrc}
                  alt={activeScenario.imageAlt}
                  width={activeScenario.imageWidth}
                  height={activeScenario.imageHeight}
                  className={styles.scenarioImage}
                  priority // Active image should be priority
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default DoubaoScenariosSection;