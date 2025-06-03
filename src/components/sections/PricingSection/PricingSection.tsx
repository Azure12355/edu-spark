// src/components/sections/PricingSection/PricingSection.tsx
"use client";
import React, { useState } from 'react';
import styles from './PricingSection.module.css';

const TABS = [
  { id: 'ondemand', label: '按量付费' },
  { id: 'production', label: '生产级保障' },
  { id: 'package', label: '资源包' },
  { id: 'free', label: '免费额度' },
  { id: 'lab', label: '应用实验室' },
];

const PRICING_DATA = [ // Simplified data structure for demo
  { model: 'Doubao-1.5-thinking-pro', new: true, online: '0.0040 / 0.0160', context: '', batch: '0.0020 / 0.0080' },
  { model: 'DeepSeek-R1', online: '0.0040 / 0.0160', context: '0.0008 / 0.000017', batch: '0.0020 / 0.0080' },
  { model: 'DeepSeek-R1-Distill-Qwen-7B', online: '0.0006 / 0.0024', context: '', batch: '0.0003 / 0.0012' },
  { model: 'DeepSeek-R1-Distill-Qwen-32B', online: '0.0015 / 0.0060', context: '0.0003 / 0.000017', batch: '0.00075 / 0.0030' },
];


const PricingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <section className={`section-padding light-bg ${styles.pricingSection}`}>
      <div className="container">
        <h2 className="section-title-global text-center">灵活多样的定价方案</h2>
        <p className={`text-center ${styles.calculatorLink}`}>
          <a href="#" className="link-arrow">价格计算器 <i className="fas fa-chevron-right"></i></a>
        </p>
        <div className={styles.pricingTabs}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
              data-tab={tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.pricingTableContainer}>
          {/* For demo, table content is static. In real app, it would change based on activeTab */}
          <table>
            <thead>
              <tr>
                <th>深度思考模型</th>
                <th>在线推理</th>
                <th>在线推理-上下文缓存</th>
                <th>批量推理 <span className={`${styles.priceTag} ${styles.lowPrice}`}>低价</span></th>
              </tr>
            </thead>
            <tbody>
              {PRICING_DATA.map((row, index) => (
                <tr key={index}>
                  <td>
                    {row.model} 
                    {row.new && <span className={styles.newBadgeTable}>NEW</span>}
                  </td>
                  <td>
                    <strong>{row.online.split(' / ')[0]}</strong> 元/千输入tokens<br/>
                    <strong>{row.online.split(' / ')[1]}</strong> 元/千输出tokens
                  </td>
                  <td>
                    {row.context ? (
                        <>
                        <strong>{row.context.split(' / ')[0]}</strong> 元/千命中tokens<br/>
                        <strong>{row.context.split(' / ')[1]}</strong> 元/千tokens缓存/小时
                        </>
                    ) : ''}
                  </td>
                  <td>
                    <strong>{row.batch.split(' / ')[0]}</strong> 元/千输入tokens<br/>
                    <strong>{row.batch.split(' / ')[1]}</strong> 元/千输出{row.model.includes('DeepSeek-R1') ? '缓存命中' : ''}tokens
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;