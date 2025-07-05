// [!file src/features/teacher/course/course-management/sub-features/question-bank/QuestionBankPage.tsx]
"use client";

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './QuestionBank.module.css';

// 1. 导入所有需要的组件和 Hook
import { useQuestionBank } from './hooks/useQuestionBank';
import SyllabusNavigator from './components/SyllabusNavigator/SyllabusNavigator';
import QuestionBankHeader from './components/QuestionBankHeader/QuestionBankHeader';
import QuestionTableToolbar from './components/QuestionTableToolbar/QuestionTableToolbar';
import QuestionTable from './components/QuestionTable/QuestionTable';
import Pagination from '@/shared/components/ui/Pagination/Pagination';
import {
    useSyllabusNavigator
} from "@/features/teacher/course/course-management/sub-features/question-bank/hooks/useSyllabusNavigator";

export default function QuestionBankPage() {
    // 2. 从全局 Store 获取初始化所需的数据
    const { syllabus, isLoading: isSyllabusLoading } = useSyllabusNavigator();

    // 3. 动态推断初始选中的知识点ID
    const initialPointId = useMemo(() => {
        if (!syllabus || syllabus.length === 0) return null;
        return syllabus[0]?.sections?.[0]?.points?.[0]?.id || null;
    }, [syllabus]);

    // 4. 【核心】一行代码获取所有业务逻辑和状态
    const {
        questions,
        pagination,
        isLoading: isQuestionsLoading,
        error,
        selectedPointId,
        searchTerm,
        filterType,
        selectedRowKeys,
        handlePointSelect,
        handleSearch,
        handleFilterChange,
        handlePageChange,
        handleDeleteQuestion,
        handleBatchDelete,
        setSelectedRowKeys,
    } = useQuestionBank(initialPointId);


    // 6. 优雅地处理错误状态
    if (error) {
        return <div className={styles.errorContainer}>错误: {error}</div>;
    }

    // 7. 【核心】装配所有子组件
    return (
        <div className={styles.pageContainer}>
            <AnimatePresence>
                <motion.div
                    className={styles.leftPanel}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <SyllabusNavigator
                        // 如果大纲正在加载，可以显示骨架屏或禁用交互
                        // 这里我们选择直接传入ID，让导航器内部处理
                        selectedPointId={selectedPointId}
                        onSelectPoint={handlePointSelect}
                    />
                </motion.div>
            </AnimatePresence>

            <motion.div
                className={styles.rightPanel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <QuestionBankHeader pointTitle={"默认知识点"} />

                <div className={styles.tableArea}>
                    <QuestionTableToolbar
                        activeFilter={filterType}
                        onFilterChange={handleFilterChange}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearch}
                        selectedCount={selectedRowKeys.length}
                        onBatchDelete={handleBatchDelete}
                    />
                    <QuestionTable
                        questions={questions}
                        isLoading={isQuestionsLoading}
                        selectedRowKeys={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
                        onDelete={handleDeleteQuestion}
                    />
                    {pagination.total > pagination.pageSize && (
                        <Pagination
                            currentPage={pagination.current}
                            totalPages={Math.ceil(pagination.total / pagination.pageSize)}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </motion.div>
        </div>
    );
}