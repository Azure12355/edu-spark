// [!file src/features/teacher/course/course-management/sub-features/point-edit/PointEditPage.tsx]
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './PointEdit.module.css';

// 1. 导入 Hook 和所有子组件
import { usePointEdit } from './hooks/usePointEdit';
import PointEditHeader from './components/PointEditHeader/PointEditHeader';
import MetadataEditor from './components/MetadataEditor/MetadataEditor'; // 新组件，替代 ConfigPanel
import PointContentEditor from './components/PointContentEditor/PointContentEditor';
import MetadataModal from './components/MetadataModal/MetadataModal'; // 模态框仍然保留，用于集中编辑

// 2. 加载和保存状态的 UI 组件保持不变
const LoadingState: React.FC = () => (
    <div className={styles.stateOverlay}>
        <span><i className="fas fa-spinner fa-spin"></i> 正在加载知识点数据...</span>
    </div>
);

const SavingState: React.FC = () => (
    <div className={styles.stateOverlay}>
        <span><i className="fas fa-spinner fa-spin"></i> 正在保存更改...</span>
    </div>
);


export default function PointEditPage() {
    // 3. 调用 Hook，获取所有数据和逻辑
    const {
        localPoint,
        isLoading,
        isSaving,
        isMetadataModalOpen,
        handleFieldChange,
        handleSave,
        openMetadataModal,
        closeMetadataModal,
    } = usePointEdit();

    const params = useParams();
    const courseId = params.id as string;
    const pointId = params.pointId as string;

    if (isLoading || !localPoint) {
        return <LoadingState />;
    }

    // 定义内容区的动画变体
    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 }
        },
    };

    return (
        <div className={styles.pageContainer}>
            {isSaving && <SavingState />}

            <PointEditHeader
                title={localPoint.title}
                backUrl={`/teacher/courses/${courseId}/syllabus/${pointId}`}
                isSaving={isSaving}
                onSave={handleSave}
                onMetadataClick={openMetadataModal}
            />

            {/* 4. 重构后的主内容区，采用单列垂直布局 */}
            <main className={styles.mainContent}>
                <motion.div
                    className={styles.contentFlow}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* 新的元信息编辑器组件 */}
                    <motion.div variants={contentVariants}>
                        <MetadataEditor
                            type={localPoint.type}
                            difficulty={localPoint.difficulty}
                            tags={localPoint.tags}
                            onFieldChange={handleFieldChange}
                        />
                    </motion.div>

                    {/* 内容编辑器 */}
                    <motion.div variants={contentVariants}>
                        <PointContentEditor
                            content={localPoint.content}
                            onContentChange={(newContent) => handleFieldChange('content', newContent)}
                        />
                    </motion.div>
                </motion.div>
            </main>

            {/* 模态框逻辑保持不变，作为一种备用或集中的编辑方式 */}
            <MetadataModal
                isOpen={isMetadataModalOpen}
                onClose={closeMetadataModal}
                point={localPoint}
                onSave={(updates) => {
                    Object.entries(updates).forEach(([field, value]) => {
                        handleFieldChange(field as keyof typeof updates, value);
                    });
                }}
            />
        </div>
    );
}