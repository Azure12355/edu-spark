// src/components/teacher/studio/HotContentTable/HotContentTable.tsx
"use client";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HotContentTable.module.css';
import Tooltip from '@/components/common/Tooltip/Tooltip';

// ... (模拟数据类型和数据保持不变)
type TrendDirection = 'up' | 'down';
interface HotContentItem {
    id: number;
    rank: number;
    title: string;
    clicks: string;
    change: string;
    trend: TrendDirection;
}
const mockData: Record<string, HotContentItem[]> = {
    '文本': Array.from({ length: 20 }, (_, i) => ({ id: i + 1, rank: i + 1, title: `经济日报：财政政策需精准提升效能，助力实体经济高质量发展 #${i + 1}`, clicks: `${(496.8 - i * 2.1).toFixed(1)}k`, change: `${(125.33 - i * 10.5).toFixed(2)}%`, trend: Math.random() > 0.3 ? 'down' : 'up', })),
    '图文': Array.from({ length: 15 }, (_, i) => ({ id: i + 101, rank: i + 1, title: `AI 艺术作品欣赏：赛博朋克都市的霓虹灯与雨夜 #${i + 1}`, clicks: `${(350.5 - i * 3.3).toFixed(1)}k`, change: `${(99.8 - i * 8.2).toFixed(2)}%`, trend: Math.random() > 0.6 ? 'down' : 'up', })),
    '视频': Array.from({ length: 25 }, (_, i) => ({ id: i + 201, rank: i + 1, title: `短视频教程：1分钟学会 Premiere Pro 高级色彩校正技巧 #${i + 1}`, clicks: `${(880.2 - i * 5.7).toFixed(1)}k`, change: `${(200.1 - i * 12.1).toFixed(2)}%`, trend: Math.random() > 0.4 ? 'down' : 'up', })),
};
const TABS = ['文本', '图文', '视频'];
const ITEMS_PER_PAGE = 5;


const TableRow = ({ item }: { item: HotContentItem }) => {
    const titleRef = useRef<HTMLDivElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        if (titleRef.current) {
            setIsTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth);
        }
    }, [item.title]);

    const titleContent = (
        <div ref={titleRef} className={styles.titleCell}>
            {item.title}
        </div>
    );

    return (
        <motion.tr
            // 关键改动：优化动画效果
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            layout // 添加 layout 属性以实现更平滑的重新排序动画
        >
            <td className={styles.colRank}>
                <span className={`${styles.rank} ${styles[`rank${item.rank}`] || ''}`}>{item.rank}</span>
            </td>
            <td className={styles.colTitle}>
                {isTruncated ? (
                    <Tooltip content={item.title} className={styles.titleTooltipWrapper}>
                        {titleContent}
                    </Tooltip>
                ) : (
                    titleContent
                )}
            </td>
            <td className={styles.colClicks}>{item.clicks}</td>
            <td className={styles.colChange}>
                <div className={`${styles.trend} ${styles[item.trend]}`}>
                    {item.change}
                    <i className={`fas fa-arrow-${item.trend}`}></i>
                </div>
            </td>
        </motion.tr>
    );
};


const HotContentTable = () => {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [currentPage, setCurrentPage] = useState(1);

    const activeData = useMemo(() => mockData[activeTab] || [], [activeTab]);
    const totalPages = useMemo(() => Math.ceil(activeData.length / ITEMS_PER_PAGE), [activeData]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return activeData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [activeData, currentPage]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>线上热门内容</h3>
                <a href="#" className={styles.moreLink}>查看更多</a>
            </div>

            <div className={styles.tabContainer}>
                {TABS.map(tab => (
                    <button
                        key={tab}
                        className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab}
                        {activeTab === tab &&
                            <motion.div className={styles.activeIndicator} layoutId="hotContentTabIndicator" />
                        }
                    </button>
                ))}
            </div>

            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th className={styles.colRank}>排名</th>
                        <th className={styles.colTitle}>内容标题</th>
                        <th className={styles.colClicks}>点击量</th>
                        <th className={styles.colChange}>日涨幅</th>
                    </tr>
                    </thead>
                    {/* 关键改动：AnimatePresence 现在包裹 tbody */}
                    <AnimatePresence initial={false}>
                        <motion.tbody>
                            {paginatedData.map((item) => (
                                <TableRow key={item.id} item={item} />
                            ))}
                        </motion.tbody>
                    </AnimatePresence>
                </table>
            </div>

            <div className={styles.pagination}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <input
                    type="number"
                    className={styles.pageInput}
                    value={currentPage}
                    // 确保输入框不会超过总页数
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || (Number(val) > 0 && Number(val) <= totalPages)) {
                            setCurrentPage(val === '' ? 1 : Number(val));
                        }
                    }}
                />
                <span>/ {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

export default HotContentTable;