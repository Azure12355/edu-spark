// src/app/teacher/(dashboard)/courses/[id]/syllabus/[pointId]/page.tsx
"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import styles from './point-detail.module.css';
import SyllabusSidebar from '@/components/teacher/course-management/point-detail/SyllabusSidebar/SyllabusSidebar';
import PointHeader from '@/components/teacher/course-management/point-detail/PointHeader/PointHeader';
import AuxiliarySidebar from '@/components/teacher/course-management/point-detail/AuxiliarySidebar/AuxiliarySidebar';
import { getPointDetailById, PointDetail } from '@/lib/data/pointDetailData';
import MarkdownRenderer from '@/components/common/MarkdownRenderer/MarkdownRenderer';

export default function PointDetailPage() {
    const params = useParams();
    const pointId = params.pointId as string;

    const [pointDetail, setPointDetail] = useState<PointDetail | null>(null);
    const contentRef = useRef<HTMLDivElement>(null); // Ref for the markdown content area

    useEffect(() => {
        const detail = getPointDetailById(pointId);
        setPointDetail(detail);
        // 切换知识点时，滚动到顶部
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [pointId]);

    if (!pointDetail) {
        return <div className={styles.pageContainer}>加载中...</div>;
    }

    // 给 Markdown 的 H 标签添加 ID
    const addIdsToHeadings = (markdown: string) => {
        return markdown.split('\n').map((line, index) => {
            if (line.match(/^#+\s/)) { // 匹配所有级别的标题
                const id = `toc-item-${index}`;
                // 确保不重复添加
                return line.includes(`{#${id}}`) ? line : `${line} {#${id}}`;
            }
            return line;
        }).join('\n');
    };

    const contentWithIds = addIdsToHeadings(pointDetail.content);

    return (
        <div className={styles.pageContainer}>
            <SyllabusSidebar />
            <main className={styles.mainContent} ref={contentRef}>
                <PointHeader point={pointDetail} />
                <div className={styles.contentBody}>
                    {/* 核心修改：为 MarkdownRenderer 的容器添加一个类名 */}
                    <div className="markdown-body">
                        <MarkdownRenderer content={contentWithIds} />
                    </div>
                    <div className={styles.contentFooter}>
                        <button><i className="far fa-thumbs-up"></i> 点赞</button>
                        <button>分享</button>
                        <button>收藏</button>
                        <span>上次浏览: {pointDetail.lastReviewed || '首次浏览'}</span>
                    </div>
                </div>
            </main>
            <AuxiliarySidebar markdownContent={pointDetail.content} />
        </div>
    );

}