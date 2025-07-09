// [!file src/widgets/analytics/TopAuthorsTable/TopAuthorsTable.tsx]
"use client";
import React, { useState, useMemo } from 'react';
import styles from './TopAuthorsTable.module.css';
import Image from 'next/image'; // 引入Image组件

// [code focus start ++]
// --- 核心修改：定义新的数据类型和模拟数据 ---
interface TeacherData {
    rank: number;
    id: number; // 教师ID
    name: string; // 教师昵称
    avatar: string; // 头像URL
    coursesPublished: number; // 发布课程数
    questionsCreated: number; // 创建题目数
    avgRating: number; // 课程平均评分
}
type SortKey = 'coursesPublished' | 'questionsCreated' | 'avgRating';
type SortDirection = 'asc' | 'desc';

// 模拟数据，反映不同教师的贡献度
const mockTeachers: TeacherData[] = [
    { rank: 1, id: 101, name: '王老师', avatar: '/default-avatar.jpg', coursesPublished: 8, questionsCreated: 520, avgRating: 4.9 },
    { rank: 2, id: 102, name: '李教授', avatar: '/default-avatar.jpg', coursesPublished: 5, questionsCreated: 780, avgRating: 4.8 },
    { rank: 3, id: 103, name: '设计部', avatar: '/default-avatar.jpg', coursesPublished: 12, questionsCreated: 310, avgRating: 4.7 },
    { rank: 4, id: 104, name: '陈博士', avatar: '/default-avatar.jpg', coursesPublished: 6, questionsCreated: 450, avgRating: 4.9 },
    { rank: 5, id: 105, name: 'Anna', avatar: '/default-avatar.jpg', coursesPublished: 9, questionsCreated: 280, avgRating: 4.6 },
    { rank: 6, id: 106, name: '极客学院', avatar: '/default-avatar.jpg', coursesPublished: 15, questionsCreated: 950, avgRating: 4.8 },
    { rank: 7, id: 107, name: '张老师', avatar: '/default-avatar.jpg', coursesPublished: 7, questionsCreated: 610, avgRating: 4.7 },
];
// [code focus end ++]


const TopAuthorsTable = () => {
    // [code focus start ++]
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>({ key: 'questionsCreated', direction: 'desc' });
    // [code focus end ++]

    const sortedAuthors = useMemo(() => {
        // [code focus start ++]
        let sortableItems = [...mockTeachers];
        // [code focus end ++]
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        // 重新计算排名
        return sortableItems.map((item, index) => ({ ...item, rank: index + 1 }));
    }, [sortConfig]);

    const requestSort = (key: SortKey) => {
        let direction: SortDirection = 'desc'; // 默认降序
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const SortableHeader = ({ sortKey, title }: { sortKey: SortKey, title: string }) => (
        <th onClick={() => requestSort(sortKey)} className={styles.sortableTh}>
            <div className={styles.sortableHeader}>
                {title}
                <div className={styles.sortIcons}>
                    <i className={`fas fa-caret-up ${sortConfig?.key === sortKey && sortConfig.direction === 'asc' ? styles.active : ''}`}></i>
                    <i className={`fas fa-caret-down ${sortConfig?.key === sortKey && sortConfig.direction === 'desc' ? styles.active : ''}`}></i>
                </div>
            </div>
        </th>
    );

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                {/* [code focus start ++] */}
                <h3 className={styles.title}>教师贡献榜</h3>
                {/* [code focus end ++] */}
            </div>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        {/* [code focus start ++] */}
                        <th>排名</th>
                        <th className={styles.authorHeader}>教师</th>
                        <SortableHeader sortKey="coursesPublished" title="发布课程" />
                        <SortableHeader sortKey="questionsCreated" title="创建题目" />
                        <SortableHeader sortKey="avgRating" title="课程均分" />
                        {/* [code focus end ++] */}
                    </tr>
                    </thead>
                    <tbody>
                    {/* [code focus start ++] */}
                    {sortedAuthors.map(author => (
                        <tr key={author.id}>
                            <td className={styles.rankCell}>
                                <span className={`${styles.rank} ${styles[`rank${author.rank}`] || ''}`}>{author.rank}</span>
                            </td>
                            <td>
                                <div className={styles.authorInfo}>
                                    <Image src={author.avatar} alt={author.name} width={32} height={32} className={styles.avatar} />
                                    <span>{author.name}</span>
                                </div>
                            </td>
                            <td>{author.coursesPublished.toLocaleString()}</td>
                            <td>{author.questionsCreated.toLocaleString()}</td>
                            <td className={styles.ratingCell}>
                                <i className="fas fa-star"></i> {author.avgRating.toFixed(1)}
                            </td>
                        </tr>
                    ))}
                    {/* [code focus end ++] */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopAuthorsTable;