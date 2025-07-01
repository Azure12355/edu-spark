// src/app/teacher/(dashboard)/courses/[id]/syllabus/[pointId]/edit/KnowledgeDetailPage.tsx
"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './PointEdit.module.css';

// 1. 导入 Bytemd 核心和 React 组件
import { Editor } from '@bytemd/react';
import 'bytemd/dist/index.css'; // Bytemd 核心样式

// 2. 导入 Bytemd 插件
import gfm from '@bytemd/plugin-gfm';
import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import mathLocale from '@bytemd/plugin-math/locales/zh_Hans.json';
import 'katex/dist/katex.css'; // KaTeX 数学公式样式
import mermaid from '@bytemd/plugin-mermaid';
import mermaidLocale from '@bytemd/plugin-mermaid/locales/zh_Hans.json';
import zh_Hans from 'bytemd/locales/zh_Hans.json'; // 编辑器主界面中文语言包

// 导入我们自己的组件和 hooks
import { useToast } from '@/shared/hooks/useToast';
import { getPointDetailById, PointDetail } from '@/shared/lib/data/pointDetailData';
import PointEditHeader from '@/features/teacher/course/course-management/sub-features/point-edit/components/PointEditHeader/PointEditHeader';
import MetadataModal from '@/features/teacher/course/course-management/sub-features/point-edit/components/MetadataModal/MetadataModal';
import {useSyllabusStore} from "@/features/teacher/course/course-management/sub-features/syllabus/store/syllabusStore";
import {KnowledgePoint} from "@/shared/lib/data/syllabusData";

export default function PointEditPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.id as string;
    const pointId = params.pointId as string;
    const showToast = useToast();

    const { syllabus, pointDetails, updatePointDetail } = useSyllabusStore();

    const [localPoint, setLocalPoint] = useState<PointDetail | null>(null);
    const [markdown, setMarkdown] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 3. 配置 Bytemd 插件
    const plugins = useMemo(() => [
        gfm({ locale: gfmLocale }),
        highlight(),
        math({ locale: mathLocale }),
        mermaid({ locale: mermaidLocale }),
    ], []);

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
            const details = pointDetails[pointId] || { content: '' };
            const fullDetail = { ...basePoint, ...details } as PointDetail;
            setLocalPoint(fullDetail);
            setMarkdown(fullDetail.content);
        }
    }, [pointId, syllabus, pointDetails]);

    const handleSave = () => {
        if (!localPoint || markdown === undefined) return;

        const updatesToSave = {
            title: localPoint.title,
            type: localPoint.type,
            difficulty: localPoint.difficulty,
            tags: localPoint.tags,
            content: markdown,
        };

        // 调用 store action 来更新全局状态和 localStorage
        updatePointDetail(pointId, updatesToSave);

        showToast({ message: "知识点已保存成功！", type: 'success' });
        router.push(`/teacher/courses/${courseId}/syllabus/${pointId}`);
    };

    const handleMetadataSave = (updatedMetadata: Partial<PointDetail>) => {
        if (localPoint) {
            setLocalPoint(prev => ({ ...prev!, ...updatedMetadata }));
        }
    };

    // 4. 模拟图片上传
    const handleUploadImages = async (files: File[]) => {
        const formData = new FormData();
        files.forEach(file => formData.append("file", file));

        // 模拟 API 上传延时
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 在真实应用中，这里会是 fetch 请求
        // const res = await fetch('YOUR_UPLOAD_API', { method: 'POST', body: formData });
        // const data = await res.json();
        // return data.map(item => ({ url: item.url }));

        // 返回模拟数据
        showToast({ message: `成功上传 ${files.length} 张图片！`, type: 'info' });
        return files.map(file => ({
            title: file.name,
            url: `https://via.placeholder.com/400x300?text=${encodeURIComponent(file.name)}`,
        }));
    };

    if (!localPoint) {
        return <div className={styles.loading}>加载中...</div>;
    }

    return (
        <div className={styles.pageContainer} data-color-mode="light">
            <PointEditHeader
                title={localPoint.title}
                backUrl={`/teacher/courses/${courseId}/syllabus/${pointId}`}
                onSave={handleSave}
                onMetadataClick={() => setIsModalOpen(true)}
            />
            <main className={styles.editorContainer}>
                <Editor
                    value={markdown}
                    plugins={plugins}
                    locale={zh_Hans}
                    onChange={(v) => setMarkdown(v)}
                    uploadImages={handleUploadImages}
                    placeholder="在这里开始你的创作..."
                />
            </main>
            <MetadataModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                point={localPoint}
                onSave={handleMetadataSave}
            />
        </div>
    );
}