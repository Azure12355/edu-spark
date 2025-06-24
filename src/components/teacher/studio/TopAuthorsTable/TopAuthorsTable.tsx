// src/components/teacher/studio/TopAuthorsTable/TopAuthorsTable.tsx
"use client";
import React, { useState, useMemo } from 'react';
import styles from './TopAuthorsTable.module.css';

// 1. 定义数据和类型
interface AuthorData {
    rank: number;
    name: string;
    contentCount: number;
    clickCount: number;
}
type SortKey = 'contentCount' | 'clickCount';
type SortDirection = 'asc' | 'desc';

const mockAuthors: AuthorData[] = [
    { rank: 1, name: '叫我小李好了', contentCount: 1463, clickCount: 22308 },
    { rank: 2, name: 'Christopher', contentCount: 1918, clickCount: 7452 },
    { rank: 3, name: '碳烤小肥羊', contentCount: 3091, clickCount: 14317 },
    { rank: 4, name: '陈皮话梅糖', contentCount: 3654, clickCount: 16719 },
    { rank: 5, name: 'Christopher', contentCount: 2504, clickCount: 10958 },
    { rank: 6, name: '王多鱼', contentCount: 2159, clickCount: 18020 },
    { rank: 7, name: '陈皮话梅糖', contentCount: 4576, clickCount: 25369 },
    { rank: 8, name: '碳烤小肥羊', contentCount: 1615, clickCount: 17782 },
];

const TopAuthorsTable = () => {
    // 2. 排序状态管理
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>({ key: 'clickCount', direction: 'desc' });

    const sortedAuthors = useMemo(() => {
        let sortableItems = [...mockAuthors];
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
        return sortableItems;
    }, [sortConfig]);

    // 3. 点击表头处理排序逻辑
    const requestSort = (key: SortKey) => {
        let direction: SortDirection = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // 4. 可复用的可排序表头组件
    const SortableHeader = ({ sortKey, title }: { sortKey: SortKey, title: string }) => (
        <th onClick={() => requestSort(sortKey)}>
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
                <h3 className={styles.title}>热门作者榜单</h3>
            </div>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th>排名</th>
                        <th>作者</th>
                        <SortableHeader sortKey="contentCount" title="内容量" />
                        <SortableHeader sortKey="clickCount" title="点击量" />
                    </tr>
                    </thead>
                    <tbody>
                    {sortedAuthors.map(author => (
                        <tr key={author.rank}>
                            <td className={styles.rank}>{author.rank}</td>
                            <td className={styles.authorName}>{author.name}</td>
                            <td>{author.contentCount.toLocaleString()}</td>
                            <td>{author.clickCount.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopAuthorsTable;