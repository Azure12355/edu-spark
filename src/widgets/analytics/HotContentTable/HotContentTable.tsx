// [!file src/widgets/analytics/HotContentTable/HotContentTable.tsx]
"use client";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HotContentTable.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

// [code focus start ++]
// --- 核心修改：定义新的数据类型和模拟数据 ---
type TrendDirection = 'up' | 'down';
interface HotQuestionItem {
    id: number;
    rank: number;
    title: string; // 题干摘要
    errorRate: number; // 错误率
    change: number; // 错误率变化
    trend: TrendDirection;
    course: string; // 所属课程
}
const mockData: Record<string, HotQuestionItem[]> = {
    '本周': Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        rank: i + 1,
        title: `(数据结构) 关于二叉树的深度优先遍历... #${i + 1}`,
        errorRate: 65.8 - i * 1.7,
        change: 5.2 - i * 0.2,
        trend: 'up',
        course: '数据结构'
    })),
    '本月': Array.from({ length: 15 }, (_, i) => ({
        id: i + 101,
        rank: i + 1,
        title: `(操作系统) 进程与线程的区别是什么？ #${i + 1}`,
        errorRate: 72.1 - i * 2.1,
        change: 3.1 + i * 0.1,
        trend: 'down',
        course: '操作系统'
    })),
    '本学期': Array.from({ length: 25 }, (_, i) => ({
        id: i + 201,
        rank: i + 1,
        title: `(计算机网络) TCP三次握手的过程详解... #${i + 1}`,
        errorRate: 80.5 - i * 1.1,
        change: 1.5 - i * 0.05,
        trend: 'up',
        course: '计算机网络'
    })),
};
const TABS = ['本周', '本月', '本学期'];
const ITEMS_PER_PAGE = 5;


const TableRow = ({ item }: { item: HotQuestionItem }) => {
    const titleRef = useRef<HTMLDivElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        if (titleRef.current) {
            setIsTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth);
        }
    }, [item.title]);

    const titleContent = (
        <div ref={titleRef} className={styles.titleCell}>
            <span className={styles.courseTag}>{item.course}</span>
            {item.title}
        </div>
    );

    return (
        <motion.tr
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            layout
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
            <td className={styles.colErrorRate}>{item.errorRate.toFixed(1)}%</td>
            <td className={styles.colChange}>
                <div className={`${styles.trend} ${styles[item.trend]}`}>
                    {item.change.toFixed(1)}%
                    <i className={`fas fa-arrow-${item.trend}`}></i>
                </div>
            </td>
        </motion.tr>
    );
};
// [code focus end ++]


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
                {/* [code focus start ++] */}
                <h3 className={styles.title}>高频错题榜</h3>
                {/* [code focus end ++] */}
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
                            <motion.div className={styles.activeIndicator} layoutId="hotQuestionTabIndicator" />
                        }
                    </button>
                ))}
            </div>

            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        {/* [code focus start ++] */}
                        <th className={styles.colRank}>排名</th>
                        <th className={styles.colTitle}>题目</th>
                        <th className={styles.colErrorRate}>错误率</th>
                        <th className={styles.colChange}>较上周期</th>
                        {/* [code focus end ++] */}
                    </tr>
                    </thead>
                    <AnimatePresence initial={false}>
                        <motion.tbody>
                            {paginatedData.map((item) => (
                                <TableRow key={item.id} item={item as HotQuestionItem} />
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