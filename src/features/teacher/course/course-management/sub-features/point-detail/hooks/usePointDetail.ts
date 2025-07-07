// [!file src/features/teacher/course/course-management/sub-features/point-detail/hooks/usePointDetail.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/point-detail/hooks/usePointDetail.ts
 * @description 知识点详情页面的核心业务逻辑钩子 (Hook)。
 * 负责获取、处理知识点数据，管理目录生成与高亮，以及侧边栏的交互状态。
 * v2.0: 重构为并行获取数据，并内聚了所有副作用逻辑。
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';

// 1. 导入所需类型和 Service
import { TocItem } from '../components/AuxiliarySidebar/TableOfContents';
import {KnowledgePointDetailVO, SyllabusVO} from "@/shared/types";
import {getKnowledgePointDetail, getSyllabusByCourseId} from '@/shared/services';

// 2. 定义 Hook 返回值类型，作为对外的“契约”
interface UsePointDetailReturn {
    pointDetail: KnowledgePointDetailVO | null;
    syllabus: SyllabusVO | null;
    isLoading: boolean;
    error: string | null;
    isSyllabusSidebarCollapsed: boolean;
    refetch: () => void;
    toggleSyllabusSidebar: () => void;
    tableOfContents: TocItem[];
    activeTocId: string;
    handleTocLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
    contentContainerRef: React.RefObject<HTMLDivElement> | any;
}

export const usePointDetail = (): UsePointDetailReturn => {
    // 3. 状态管理
    const params = useParams();
    const courseId = params.id as unknown as number;
    const pointId = params.pointId as unknown as number;

    const [pointDetail, setPointDetail] = useState<KnowledgePointDetailVO | null>(null);
    const [syllabus, setSyllabus] = useState<SyllabusVO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSyllabusSidebarCollapsed, setIsSyllabusSidebarCollapsed] = useState(false);

    // -- 右侧辅助栏相关状态 --
    const [tableOfContents, setTableOfContents] = useState<TocItem[]>([]);
    const [activeTocId, setActiveTocId] = useState('');
    const contentContainerRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    // 4. 核心数据获取逻辑
    const fetchData = useCallback(async () => {
        if (!courseId || !pointId) {
            setError("无效的课程或知识点ID");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        // 并行获取知识点详情和课程大纲
        const results = await Promise.allSettled([
            getKnowledgePointDetail(pointId),
            getSyllabusByCourseId(courseId)
        ]);

        const pointDetailResult = results[0];
        const syllabusResult = results[1];

        // 优先处理核心数据：知识点详情
        if (pointDetailResult.status === 'fulfilled') {
            setPointDetail(pointDetailResult.value);
        } else {
            console.error("获取知识点详情失败:", pointDetailResult.reason);
            setError(pointDetailResult.reason?.message || "获取知识点详情失败，请检查网络或联系管理员。");
            setPointDetail(null);
        }

        // 处理辅助数据：课程大纲
        if (syllabusResult.status === 'fulfilled') {
            setSyllabus(syllabusResult.value);
        } else {
            console.warn("获取课程大纲失败:", syllabusResult.reason);
            // 大纲加载失败不应阻塞页面渲染，仅记录警告
            setSyllabus(null);
        }

        setIsLoading(false);
    }, [courseId, pointId]);

    // 组件挂载时执行初次加载
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // 5. 目录生成与滚动监听逻辑 (TOC)
    useEffect(() => {
        const scrollContainer = contentContainerRef.current;
        // 仅当核心内容（知识点详情）存在时才执行
        if (!scrollContainer || !pointDetail?.content) return;

        // 清理上一次的观察者
        if (observer.current) observer.current.disconnect();

        // 使用 MutationObserver 确保在 Markdown 内容完全渲染到 DOM 后再执行
        const domObserver = new MutationObserver(() => {
            const viewerContent = scrollContainer.querySelector('.bytemd-preview');
            const headings = viewerContent?.querySelectorAll('h1, h2, h3, h4');

            if (headings && headings.length > 0) {
                const newToc = Array.from(headings).map((el, index) => {
                    const id = `toc-heading-${index}`;
                    el.id = id;
                    return { level: parseInt(el.tagName.substring(1), 10), text: el.textContent || '', id };
                });

                setTableOfContents(newToc);

                // 创建并启动 IntersectionObserver
                observer.current = new IntersectionObserver((entries) => {
                    const visibleEntries = entries.filter(e => e.isIntersecting);
                    if (visibleEntries.length > 0) {
                        visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                        setActiveTocId(visibleEntries[0].target.id);
                    }
                }, { root: scrollContainer, rootMargin: '0px 0px -80% 0px' });

                headings.forEach(el => observer.current?.observe(el));
            } else {
                setTableOfContents([]);
            }
            // 成功执行后断开，避免不必要的重复执行
            domObserver.disconnect();
        });

        domObserver.observe(scrollContainer, { childList: true, subtree: true });

        return () => {
            domObserver.disconnect();
            observer.current?.disconnect();
        };
    }, [pointDetail?.content]); // 依赖于知识点内容的实际变化


    const toggleSyllabusSidebar = useCallback(() => setIsSyllabusSidebarCollapsed(prev => !prev), []);

    const handleTocLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const scrollContainer = contentContainerRef.current;
        const targetElement = scrollContainer?.querySelector(`#${id}`);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    // 7. 返回所有状态和方法
    return {
        pointDetail,
        syllabus,
        isLoading,
        error,
        isSyllabusSidebarCollapsed,
        refetch: fetchData,
        toggleSyllabusSidebar,
        tableOfContents,
        activeTocId,
        handleTocLinkClick,
        contentContainerRef,
    };
};