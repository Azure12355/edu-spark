// src/components/sections/ModelAndSubjectCatalogSection/ModelAndSubjectCatalogSection.tsx
"use client";
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './ModelAndSubjectCatalogSection.module.css';

interface CatalogRow {
  model: string; // 支持模型
  isNew?: boolean;
  isHot?: boolean;
  capabilities: string; // 核心能力
  applicableCourses: string; // 适用课程
  knowledgeSource: string; // 知识库来源
}

interface TabData {
  [tabId: string]: CatalogRow[];
}

const TABS = [
  { id: 'it', label: '计算机科学' },
  { id: 'languages', label: '语言文学' },
  { id: 'science', label: '数理科学' },
  { id: 'business', label: '商科经济' },
  { id: 'arts', label: '人文艺术' },
];

const ALL_CATALOG_DATA: TabData = {
  it: [
    { model: 'DeepSeek-Coder', isHot: true, capabilities: '代码生成、补全、纠错、解释', applicableCourses: 'C++, Java, Python, Web开发, 软件工程', knowledgeSource: '开源代码库, 专业编程书籍' },
    { model: 'Qwen-72B-Chat', capabilities: '系统设计问答, 算法逻辑推理', applicableCourses: '数据结构与算法, 操作系统, 计算机网络', knowledgeSource: '《嵌入式Linux开发》, CS核心教材' },
    { model: 'GLM-4', isNew: true, capabilities: '多轮对话式Agent开发, 工具调用', applicableCourses: '人工智能, 机器学习项目实战', knowledgeSource: 'Langchain/SpringAI官方文档' },
  ],
  languages: [
    { model: 'Qwen-72B-Chat', isHot: true, capabilities: '中英互译, 润色, 摘要', applicableCourses: '大学英语, 商务英语, 翻译', knowledgeSource: '精选双语平行语料库' },
    { model: 'GLM-4', capabilities: '口语对话陪练, 发音评测', applicableCourses: '英语口语, 雅思/托福备考', knowledgeSource: '模拟日常与学术对话场景库' },
    { model: 'DeepSeek-LLM', isNew: true, capabilities: '古典文学分析, 诗歌创作', applicableCourses: '中国文学史, 外国文学赏析', knowledgeSource: '公开版权的文学作品' },
  ],
  science: [
    { model: 'GLM-4', isHot: true, capabilities: '数学公式推导, 物理题解', applicableCourses: '高等数学, 大学物理, 线性代数', knowledgeSource: '数理学科公开数据集与教材' },
    { model: 'Qwen-VL-Max', isNew: true, capabilities: '化学结构图识别, 生物实验步骤生成', applicableCourses: '有机化学, 分子生物学', knowledgeSource: '化学信息学数据库, 生物实验手册' },
  ],
  business: [
    { model: 'DeepSeek-LLM', capabilities: '商业案例分析, 市场报告生成', applicableCourses: '市场营销, 企业战略管理, 金融学', knowledgeSource: '公开的商业案例与行业研报' },
    { model: 'Qwen-72B-Chat', isHot: true, capabilities: '经济数据解读, 投资组合建议', applicableCourses: '宏观经济学, 证券投资分析', knowledgeSource: '经济学数据库, 财经新闻' },
  ],
  arts: [], // 留空以展示“暂无数据”的情况
};

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
  visible: { transition: { staggerChildren: 0.07 } },
};
const tabButtonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const tableContainerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
};


const ModelAndSubjectCatalogSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(TABS[0].id);

  const currentCatalogData = useMemo(() => {
    return ALL_CATALOG_DATA[activeTabId] || [];
  }, [activeTabId]);

  return (
    <motion.section
      className={styles.catalogSection}
      variants={sectionOverallVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className={`container ${styles.fullHeightContainer}`}>
        <motion.h2
          className={`section-title-global text-center ${styles.mainSectionTitle}`}
          variants={titleVariants}
        >
          模型与学科支持目录
        </motion.h2>
        <motion.p
          className={`text-center ${styles.catalogLink}`}
          variants={titleVariants}
          custom={0.1}
        >
          <a href="#" className="link-arrow">查看完整支持列表 <i className="fas fa-chevron-right"></i></a>
        </motion.p>

        <motion.div className={styles.catalogTabs} variants={tabsContainerVariants}>
          {TABS.map(tab => (
            <motion.button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTabId === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTabId(tab.id)}
              variants={tabButtonVariants}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className={styles.catalogTableWrapper}
          key={activeTabId}
          variants={tableContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={`${styles.catalogTableContainer} ${currentCatalogData.length > 5 ? styles.scrollableTable : ''}`}>
            <table>
              <thead>
                <tr>
                  <th>支持模型</th>
                  <th>核心能力</th>
                  <th>适用课程</th>
                  <th>知识库来源</th>
                </tr>
              </thead>
              <tbody>
                {currentCatalogData.length > 0 ? currentCatalogData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      {row.model}
                      {row.isNew && <span className={styles.newBadgeTable}>上新</span>}
                      {row.isHot && <span className={styles.hotBadgeTable}>热门</span>}
                    </td>
                    <td><span className={styles.descriptionText}>{row.capabilities}</span></td>
                    <td><span className={styles.descriptionText}>{row.applicableCourses}</span></td>
                    <td><span className={styles.descriptionText}>{row.knowledgeSource}</span></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className={styles.noDataCell}>该学科正在建设中，敬请期待...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ModelAndSubjectCatalogSection;