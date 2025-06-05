// src/components/sections/PricingSection/PricingSection.tsx
"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PricingSection.module.css';

interface PricingRow {
  model: string;
  new?: boolean;
  lowPrice?: boolean; // 用于标识批量推理的低价标签
  online: string; // "输入价格 / 输出价格"
  context?: string; // "命中价格 / 缓存价格/小时"
  batch: string; // "输入价格 / 输出价格"
}

interface TabData {
  [tabId: string]: PricingRow[];
}

const TABS = [
  { id: 'ondemand', label: '按量付费' },
  { id: 'production', label: '生产级保障' },
  { id: 'package', label: '资源包' },
  { id: 'free', label: '免费额度' },
  { id: 'lab', label: '应用实验室' },
];

// 为每个Tab模拟不同的数据
const ALL_PRICING_DATA: TabData = {
  ondemand: [
    { model: 'Doubao-1.5-thinking-pro', new: true, online: '0.0040 / 0.0160', batch: '0.0020 / 0.0080', lowPrice: true },
    { model: 'DeepSeek-R1', online: '0.0040 / 0.0160', context: '0.0008 / 0.000017', batch: '0.0020 / 0.0080', lowPrice: true },
    { model: 'DeepSeek-R1-Distill-Qwen-7B', online: '0.0006 / 0.0024', batch: '0.0003 / 0.0012' },
    { model: 'DeepSeek-R1-Distill-Qwen-32B', online: '0.0015 / 0.0060', context: '0.0003 / 0.000017', batch: '0.00075 / 0.0030' },
    { model: 'SkyChat-Pro-128k', new: true, online: '0.0050 / 0.0200', context: '0.0010 / 0.000020', batch: '0.0025 / 0.0100' },
    { model: 'Moonshot-v1-8k', online: '0.0120 / 0.0120', batch: '0.0060 / 0.0060' },
    { model: 'Baichuan2-53B', online: '0.0200 / 0.0200', batch: '0.0100 / 0.0100', lowPrice: true },
  ],
  production: [ // 生产级保障数据示例 (价格可能更高)
    { model: 'Doubao-1.5-thinking-pro (生产级)', new: true, online: '0.0060 / 0.0240', batch: '0.0030 / 0.0120' },
    { model: 'DeepSeek-R1 (生产级)', online: '0.0060 / 0.0240', context: '0.0012 / 0.000025', batch: '0.0030 / 0.0120' },
    { model: 'SkyChat-Pro-128k (生产级)', online: '0.0075 / 0.0300', batch: '0.0037 / 0.0150' },
  ],
  package: [ // 资源包数据示例 (通常是打包优惠)
    { model: '基础资源包 (1000万 Tokens)', online: '含输入500万/输出500万', batch: '有效期90天', context: '价格: ¥99' },
    { model: '进阶资源包 (5000万 Tokens)', online: '含输入2500万/输出2500万', batch: '有效期180天', context: '价格: ¥450' },
    { model: '企业资源包 (2亿 Tokens)', new: true, online: '含输入1亿/输出1亿', batch: '有效期365天', context: '价格: ¥1600' },
  ],
  free: [ // 免费额度数据示例
    { model: '新用户注册礼包', online: '100万Tokens', batch: '有效期30天', context: '覆盖常用模型' },
    { model: '开发者激励计划', new: true, online: '每月50万Tokens', batch: '需申请', context: '限指定模型' },
  ],
  lab: [ // 应用实验室数据示例
    { model: 'AI Agent 构建套件', online: '免费试用', batch: '基础功能', context: '高级功能按需付费' },
    { model: '多模态内容生成', online: '免费试用', batch: '每日限额', context: '商业使用需授权' },
  ],
};

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


const PricingSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(TABS[0].id);

  const currentPricingData = useMemo(() => {
    return ALL_PRICING_DATA[activeTabId] || [];
  }, [activeTabId]);

  return (
    <motion.section
      className={styles.pricingSection}
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
          灵活多样的定价方案
        </motion.h2>
        <motion.p
          className={`text-center ${styles.calculatorLink}`}
          variants={titleVariants}
          custom={0.1}
        >
          <a href="#" className="link-arrow">价格计算器 <i className="fas fa-chevron-right"></i></a>
        </motion.p>

        <motion.div className={styles.pricingTabs} variants={tabsContainerVariants}>
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
              {/* {activeTabId === tab.id && (
                <motion.div className={styles.activeTabIndicator} layoutId="activePricingTabIndicator" />
              )} */}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className={styles.pricingTableWrapper}
          key={activeTabId} // 让表格内容随Tab切换时有动画
          variants={tableContainerVariants}
          initial="hidden" // 确保切换时也应用入场动画
          animate="visible"
        >
          <div className={`${styles.pricingTableContainer} ${currentPricingData.length > 5 ? styles.scrollableTable : ''}`}>
            <table>
              <thead>
                <tr>
                  <th>{activeTabId === 'package' || activeTabId === 'free' ? '套餐/额度名称' : '模型名称'}</th>
                  <th>{activeTabId === 'package' || activeTabId === 'free' ? '详情' : '在线推理'}</th>
                  <th>{activeTabId === 'package' || activeTabId === 'free' ? '有效期/说明' : '在线推理-上下文缓存'}</th>
                  <th>{activeTabId === 'package' || activeTabId === 'free' ? '价格/限制' : '批量推理'}</th>
                </tr>
              </thead>
              <tbody>
                {currentPricingData.length > 0 ? currentPricingData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      {row.model}
                      {row.new && <span className={styles.newBadgeTable}>NEW</span>}
                    </td>
                    <td>
                      {row.online.includes('/') ? (
                        <>
                          <strong>{row.online.split(' / ')[0]}</strong> 元/千输入tokens<br />
                          <strong>{row.online.split(' / ')[1]}</strong> 元/千输出tokens
                        </>
                      ) : row.online}
                    </td>
                    <td>
                      {row.context ? (
                        row.context.includes('/') ? (
                          <>
                            <strong>{row.context.split(' / ')[0]}</strong> 元/千命中tokens<br />
                            <strong>{row.context.split(' / ')[1]}</strong> 元/千tokens缓存/小时
                          </>
                        ) : row.context
                      ) : ''}
                    </td>
                    <td>
                      {row.batch.includes('/') ? (
                         <>
                          <strong>{row.batch.split(' / ')[0]}</strong> 元/千输入tokens
                          {row.lowPrice && <span className={`${styles.priceTag} ${styles.lowPrice}`}>低价</span>}
                          <br />
                          <strong>{row.batch.split(' / ')[1]}</strong> 元/千输出tokens
                         </>
                      ): row.batch}
                       {activeTabId === 'ondemand' && !row.batch.includes('/') && row.lowPrice && <span className={`${styles.priceTag} ${styles.lowPrice}`}>低价</span>}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className={styles.noDataCell}>暂无数据</td>
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

export default PricingSection;