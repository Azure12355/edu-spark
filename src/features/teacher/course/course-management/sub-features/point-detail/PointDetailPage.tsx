// [!file src/features/teacher/course/course-management/sub-features/point-detail/PointDetailPage.tsx]
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './PointDetail.module.css';

// 1. 导入核心 Hook，它将提供页面所需的一切
import { usePointDetail } from './hooks/usePointDetail';

// 2. 导入所有需要装配的子组件
import SyllabusSidebar from './components/SyllabusSidebar/SyllabusSidebar';
import PointHeader from './components/PointHeader/PointHeader';
import PointContentViewer from './components/PointContentViewer/PointContentViewer';
import AuxiliarySidebar from './components/AuxiliarySidebar/AuxiliarySidebar';

// 3. 将加载和错误状态的 UI 实现为独立的、可复用的组件
const LoadingState: React.FC = () => (
    <div className={styles.centeredContainer}>
        <div className={styles.spinner}></div>
        <p>正在加载知识点详情...</p>
    </div>
);

const ErrorState: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
    <div className={styles.centeredContainer}>
        <i className={`fas fa-exclamation-triangle ${styles.errorIcon}`}></i>
        <h3>加载失败</h3>
        <p>{message || "无法获取知识点信息，请检查网络或稍后重试。"}</p>
        <button onClick={onRetry} className={styles.retryButton}>点击重试</button>
    </div>
);

// 当知识点有内容时渲染的组件
const ContentWithFooter: React.FC<{ pointDetail: any }> = ({ pointDetail }) => (
    <div className={styles.contentBody}>
        <PointContentViewer markdownContent={pointDetail.content} />
        <div className={styles.contentFooter}>
            <button><i className="far fa-thumbs-up"></i> 点赞 ({pointDetail.metadata?.likeCount || 0})</button>
            <button>分享</button>
            <button>收藏</button>
            <span>上次浏览: {pointDetail.metadata?.lastReviewed || '首次浏览'}</span>
        </div>
    </div>
);

// 当知识点无内容时渲染的组件
const NoContentState: React.FC = () => (
    <div className={styles.contentBody}>
        <div className={styles.noContentState}>
            <i className="fas fa-file-alt"></i>
            <h3>内容正在建设中...</h3>
            <p>该知识点的详细内容正在紧急编写中，您可以点击右上角的“编辑内容”按钮开始创作。</p>
        </div>
    </div>
);


export default function PointDetailPage() {
    // 4. 只需一行代码，即可获取所有的数据、状态和回调函数
    const {
        pointDetail,
        syllabus,
        isLoading,
        error,
        isSyllabusSidebarCollapsed,
        refetch,
        toggleSyllabusSidebar,
        tableOfContents,
        activeTocId,
        hotQuestions,
        handleTocLinkClick,
        contentContainerRef,
    } = usePointDetail();

    // 5. 根据顶层状态进行渲染决策
    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={refetch} />;
    }

    // 定义页面内容过渡动画
    const pageVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            className={styles.pageContainer}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 6. 装配左侧大纲导航栏 */}
            <SyllabusSidebar
                syllabus={syllabus}
                isLoading={isLoading} // 将加载状态传递下去，以便显示骨架屏
                isCollapsed={isSyllabusSidebarCollapsed}
                toggleCollapse={toggleSyllabusSidebar}
            />

            {/* 7. 装配主内容区域 */}
            <main className={styles.mainContent} ref={contentContainerRef}>
                <PointHeader point={pointDetail} isLoading={isLoading} />
                {pointDetail?.content ? <ContentWithFooter pointDetail={pointDetail} /> : <NoContentState />}
            </main>

            {/* 8. 装配右侧辅助侧边栏 */}
            <AuxiliarySidebar
                toc={tableOfContents}
                hotQuestions={hotQuestions}
                activeTocId={activeTocId}
                onTocLinkClick={handleTocLinkClick}
                isLoading={isLoading}
            />
        </motion.div>
    );
}