// src/app/teacher/(dashboard)/courses/[id]/syllabus/[pointId]/page.tsx
"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import styles from './point-detail.module.css';
import SyllabusSidebar from '@/components/teacher/course-management/point-detail/SyllabusSidebar/SyllabusSidebar';
import PointHeader from '@/components/teacher/course-management/point-detail/PointHeader/PointHeader';
import AuxiliarySidebar from '@/components/teacher/course-management/point-detail/AuxiliarySidebar/AuxiliarySidebar';
import { useSyllabusStore } from '@/store/syllabusStore';
import { PointDetail } from '@/lib/data/pointDetailData';
import {KnowledgePoint} from "@/lib/data/syllabusData";
// 1. 导入新的 PointContentViewer 组件
import PointContentViewer from '@/components/teacher/course-management/point-detail/PointContentViewer/PointContentViewer';

// 2. 不再需要 MarkdownRenderer
// import MarkdownRenderer from '@/components/common/MarkdownRenderer/MarkdownRenderer';


export default function PointDetailPage() {
    const params = useParams();
    const pointId = params.pointId as string;

    const { syllabus, pointDetails } = useSyllabusStore();
    const [pointDetail, setPointDetail] = useState<PointDetail | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let basePoint: KnowledgePoint | null = null;
        for (const chapter of syllabus) {
            for (const section of chapter.sections) {
                const found = section.points.find(p => p.id === pointId);
                if (found) { basePoint = found; break; }
            }
            if (basePoint) break;
        }

        if (basePoint) {
            const details = pointDetails[pointId] || {
                difficulty: '中等', tags: ['新知识点'], viewCount: 0, likeCount: 0,
                content: '# 欢迎来到新知识点\n\n请点击右上角的【编辑内容】按钮开始创作。'
            };
            setPointDetail({ ...basePoint, ...details });
        } else {
            setPointDetail(null);
        }

        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [pointId, syllabus, pointDetails]);

    if (!pointDetail) {
        return <div className={styles.loading}>加载中...</div>;
    }

    return (
        <div className={styles.pageContainer}>
            <SyllabusSidebar />
            <main className={styles.mainContent} ref={contentRef}>
                <PointHeader point={pointDetail} />
                <div className={styles.contentBody}>
                    {/* 4. 使用新的 PointContentViewer 组件 */}
                    <PointContentViewer markdownContent={pointDetail.content} />

                    <div className={styles.contentFooter}>
                        <button><i className="far fa-thumbs-up"></i> 点赞</button>
                        <button>分享</button>
                        <button>收藏</button>
                        <span>上次浏览: {pointDetail.lastReviewed || '首次浏览'}</span>
                    </div>
                </div>
            </main>
            {/* 5. 将主内容区的 ref 传递给右侧边栏，用于滚动监听 */}
            <AuxiliarySidebar markdownContent={pointDetail.content} scrollContainerRef={contentRef} />
        </div>
    );
}