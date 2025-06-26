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
import {useSyllabusStore} from "@/store/syllabusStore";
import {KnowledgePoint} from "@/lib/data/syllabusData";

export default function PointDetailPage() {
    const params = useParams();
    const pointId = params.pointId as string;

    const { syllabus, pointDetails } = useSyllabusStore();
    const [pointDetail, setPointDetail] = useState<PointDetail | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);// Ref for the markdown content area

    useEffect(() => {
        let basePoint: KnowledgePoint | null = null;
        for (const chapter of syllabus) {
            for (const section of chapter.sections) {
                const found = section.points.find(p => p.id === pointId);
                if (found) {
                    basePoint = found;
                    break;
                }
            }
            if (basePoint) break;
        }

        if (basePoint) {
            const details = pointDetails[pointId] || {
                difficulty: '中等',
                tags: ['新知识点'],
                viewCount: 0,
                likeCount: 0,
                content: '# 欢迎来到新知识点\n\n请点击右上角的【编辑内容】按钮开始创作。'
            };
            setPointDetail({ ...basePoint, ...details });
        } else {
            setPointDetail(null); // or redirect to a not found page
        }

        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [pointId, syllabus, pointDetails]); // 依赖 store 中的数据

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