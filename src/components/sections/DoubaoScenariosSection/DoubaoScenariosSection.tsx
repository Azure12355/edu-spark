// src/components/sections/DoubaoScenariosSection/DoubaoScenariosSection.tsx
"use client"; // 需要客户端交互
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './DoubaoScenariosSection.module.css';

// 假设的图标组件或路径
const IconDoubaoSmall = () => <span className={styles.relatedProductIcon} style={{background: 'linear-gradient(45deg, #FFD700, #FF69B4, #00BFFF)', color: 'white'}}>豆</span>;
const IconKouzi = () => <span className={styles.relatedProductIcon} style={{background: '#FF8C00', color: 'white'}}>扣</span>; // 扣子图标
const IconHiAgentSmall = () => <span className={styles.relatedProductIcon} style={{background: '#50E3C2', color: 'white'}}>Hi</span>;
const IconLab = () => <span className={styles.relatedProductIcon} style={{background: '#7B68EE', color: 'white'}}>验</span>;


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
    title: '智能座舱',
    descriptionPoints: [
      "用车顾问：可基于车辆功能、行车知识、交规问答，配合RAG和抖音视频，提供准确和多样化的信息交互",
      "POI推荐+行程助手：结合豆包大模型和抖音本地生活POI，提供智能的POI搜索和行程规划能力",
      "AI副驾：结合多模资讯、抖音资讯，智能理解用户意图并且搜索相关新闻资讯、提供新闻总结和播报能力",
    ],
    relatedProducts: [
      { icon: <IconDoubaoSmall />, name: '豆包大模型' },
      { icon: <IconKouzi />, name: '扣子' },
      { icon: <IconHiAgentSmall />, name: 'Hi Agent' },
      { icon: <IconLab />, name: '应用实验室' },
    ],
    imageSrc: 'https://lf-volc-website.volccdn.com/obj/volcengine-public/large_language_model/image/doubao-scenario-1.1.0.png', // 官网智能座舱图片
    imageAlt: '智能座舱演示',
    imageWidth: 600, // 示例尺寸，根据实际图片调整
    imageHeight: 420,
  },
  {
    id: 'online-education',
    tabName: '在线教育',
    title: '在线教育',
    descriptionPoints: [
      "拍照解题：通过图像理解和解题意图识别题目，解析更新点，快速匹配解题思路与方法，助力学生高效攻克难题",
      "陪练助手：家长式记忆学习历程，依据过往数据调整陪练策略，针对性强化，给予个性化学习引导",
      "虚拟课堂：模拟真实课堂场景，以丰富的专业储备设计互动环节，激发学生学习兴趣，提升知识吸收效果",
    ],
    relatedProducts: [
        { icon: <IconDoubaoSmall />, name: '豆包大模型' },
        { icon: <IconKouzi />, name: '扣子' },
        { icon: <IconLab />, name: '应用实验室' },
    ],
    imageSrc: 'https://lf-volc-website.volccdn.com/obj/volcengine-public/large_language_model/image/doubao-scenario-2.1.0.png', // 官网在线教育图片
    imageAlt: '在线教育演示',
    imageWidth: 600,
    imageHeight: 420,
  },
  // 可以继续添加其他场景：智能终端, 社交娱乐, 智能客服, 营销提效, 消费零售
  { id: 'smart-terminal', tabName: '智能终端', title: '智能终端', descriptionPoints: ["...", "..."], relatedProducts: [], imageSrc: 'https://via.placeholder.com/600x420/E0F0FF/333?text=智能终端', imageAlt: '智能终端', imageWidth:600, imageHeight:420 },
  { id: 'social-entertainment', tabName: '社交娱乐', title: '社交娱乐', descriptionPoints: ["...", "..."], relatedProducts: [], imageSrc: 'https://via.placeholder.com/600x420/FFE0F0/333?text=社交娱乐', imageAlt: '社交娱乐', imageWidth:600, imageHeight:420 },
  { id: 'smart-customer-service', tabName: '智能客服', title: '智能客服', descriptionPoints: ["...", "..."], relatedProducts: [], imageSrc: 'https://via.placeholder.com/600x420/E0FFE0/333?text=智能客服', imageAlt: '智能客服', imageWidth:600, imageHeight:420 },
  { id: 'marketing-efficiency', tabName: '营销提效', title: '营销提效', descriptionPoints: ["...", "..."], relatedProducts: [], imageSrc: 'https://via.placeholder.com/600x420/FFF0E0/333?text=营销提效', imageAlt: '营销提效', imageWidth:600, imageHeight:420 },
  { id: 'consumer-retail', tabName: '消费零售', title: '消费零售', descriptionPoints: ["...", "..."], relatedProducts: [], imageSrc: 'https://via.placeholder.com/600x420/F0E0FF/333?text=消费零售', imageAlt: '消费零售', imageWidth:600, imageHeight:420 },
];

const DoubaoScenariosSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(scenariosData[0].id);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);

  const handleTabClick = (tabId: string) => {
    const currentIndex = scenariosData.findIndex(s => s.id === tabId);
    const previousIndex = scenariosData.findIndex(s => s.id === activeTabId);

    if (currentIndex > previousIndex) {
      setSlideDirection('left'); // 新卡片从右边进入，旧卡片向左边滑出
    } else if (currentIndex < previousIndex) {
      setSlideDirection('right'); // 新卡片从左边进入，旧卡片向右边滑出
    } else {
      setSlideDirection(null); // 点击当前tab，不滑动
    }
    setPrevActiveIndex(previousIndex);
    setActiveTabId(tabId);
  };

  const activeScenario = scenariosData.find(scenario => scenario.id === activeTabId) || scenariosData[0];
  const currentActiveIndex = scenariosData.findIndex(s => s.id === activeTabId);

  return (
    <section className={`section-padding ${styles.scenariosSection}`}>
      <div className="container">
        <h2 className={`section-title-global text-center ${styles.mainSectionTitle}`}>
          豆包大模型应用场景
        </h2>
        <p className={`text-center ${styles.sectionSubtitle}`}>
          丰富的应用场景和解决方案，满足多种业务需求
        </p>

        <div className={styles.tabsContainer}>
          {scenariosData.map(scenario => (
            <button
              key={scenario.id}
              className={`${styles.tabButton} ${activeTabId === scenario.id ? styles.active : ''}`}
              onClick={() => handleTabClick(scenario.id)}
            >
              {scenario.tabName}
            </button>
          ))}
        </div>

        <div className={styles.cardContainerWrapper}>
          {scenariosData.map((scenario, index) => (
            <div
              key={scenario.id}
              className={`
                ${styles.scenarioCard}
                ${scenario.id === activeTabId ? styles.cardActive : styles.cardInactive}
                ${slideDirection && scenario.id === activeTabId ? (slideDirection === 'left' ? styles.slideFromRight : styles.slideFromLeft) : ''}
                ${slideDirection && index === prevActiveIndex && scenario.id !== activeTabId ? (slideDirection === 'left' ? styles.slideToLeft : styles.slideToRight) : ''}
              `}
            >
              <div className={styles.cardTextContent}>
                <h3 className={styles.cardTitle}>{scenario.title}</h3>
                <ul className={styles.descriptionList}>
                  {scenario.descriptionPoints.map((point, i) => (
                    <li key={i}><i className="fas fa-check"></i> {point}</li>
                  ))}
                </ul>
                <h4 className={styles.relatedProductsTitle}>相关产品</h4>
                <div className={styles.relatedProductsList}>
                  {scenario.relatedProducts.map((product, i) => (
                    <span key={i} className={styles.relatedProductItem}>
                      {product.icon} {product.name}
                    </span>
                  ))}
                </div>
                <div className={styles.cardButtons}>
                  <a href="#" className={`${styles.cardBtn} ${styles.primaryBtn}`}>立即咨询</a>
                  <a href="#" className={`${styles.cardBtn} ${styles.secondaryBtn}`}>模型详情</a>
                </div>
              </div>
              <div className={styles.cardImageWrapper}>
                <Image
                  src={scenario.imageSrc}
                  alt={scenario.imageAlt}
                  width={scenario.imageWidth}
                  height={scenario.imageHeight}
                  className={styles.scenarioImage}
                  priority={scenario.id === activeTabId} // 优先加载活动卡片的图片
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoubaoScenariosSection;