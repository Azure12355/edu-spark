// src/components/teacher/course-management/syllabus/SyllabusHeader/SyllabusHeader.tsx
"use client";
import React from 'react';
import Link from 'next/link'; // 1. 导入 Link 组件
import { useParams } from 'next/navigation'; // 2. 导入 useParams hook
import styles from './SyllabusHeader.module.css';

interface SyllabusHeaderProps {
    onExpandAll: () => void;
    onCollapseAll: () => void;
}

const SyllabusHeader: React.FC<SyllabusHeaderProps> = ({ onExpandAll, onCollapseAll }) => {
    const params = useParams(); // 3. 获取路由参数
    const courseId = params.id;

    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.title}>课程大纲</h1>
            <div className={styles.actions}>
                <div className={styles.searchBar}>
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="搜索知识点..." />
                </div>
                <button onClick={onExpandAll} className={styles.actionButton}>
                    <i className="far fa-plus-square"></i> 全部展开
                </button>
                <button onClick={onCollapseAll} className={styles.actionButton}>
                    <i className="far fa-minus-square"></i> 全部收起
                </button>
                {/* 4. 新增“大纲管理”按钮，使用 Link 组件包裹 */}
                <Link href={`/teacher/courses/${courseId}/syllabus/edit`} passHref>
                    <button className={`${styles.actionButton} ${styles.manageButton}`}>
                        <i className="fas fa-edit"></i> 大纲管理
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SyllabusHeader;