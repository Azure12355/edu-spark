"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/useToast';
import {
    // 类型导入
    KnowledgeBaseVO,
    KnowledgeBaseAddRequest,
    Page,
    // API调用
    listKnowledgeBasesByPage,
    createKnowledgeBase,
    deleteKnowledgeBase,

} from '@/services/knowledgeService';

// 组件导入
import KnowledgeBaseHeader from '@/components/teacher/knowledge/home/KnowledgeBaseHeader/KnowledgeBaseHeader';
import KnowledgeSteps from '@/components/teacher/knowledge/home/KnowledgeSteps/KnowledgeSteps';
import KnowledgeToolbar from '@/components/teacher/knowledge/home/KnowledgeToolbar/KnowledgeToolbar';
import KnowledgeGrid from '@/components/teacher/knowledge/home/KnowledgeGrid/KnowledgeGrid';
import CreateKnowledgeModal from '@/components/teacher/knowledge/home/CreateKnowledgeModal/CreateKnowledgeModal';
import Pagination from '@/components/common/Pagination/Pagination';

import styles from './knowledge.module.css';

const ITEMS_PER_PAGE = 8;

export default function KnowledgePage() {
    // --- UI 状态 ---
    const [isStepsVisible, setIsStepsVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // --- 数据和分页状态 ---
    const [kbPage, setKbPage] = useState<Page<KnowledgeBaseVO> | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // --- 筛选和排序状态 ---
    // (这些状态现在由 KnowledgeToolbar 内部管理，或提升到此处)
    // 为了示例清晰，我们暂时假设筛选逻辑在API层面完成

    const showToast = useToast();

    // --- 【核心】数据获取逻辑 ---
    const fetchData = useCallback(async (page: number) => {
        setIsLoading(true);
        try {
            const params = {
                current: page,
                pageSize: ITEMS_PER_PAGE,
                // TODO: 在此添加从 Toolbar 获取的筛选和排序参数
            };
            const result = await listKnowledgeBasesByPage(params);
            setKbPage(result);
        } catch (error: any) {
            // 错误已由 apiClient 统一处理并弹窗，此处只需记录日志
            console.error("Failed to fetch knowledge bases:", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // --- Effect Hook: 在 currentPage 变化时重新获取数据 ---
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, fetchData]);


    // --- 【核心】处理创建知识库的逻辑 ---
    const handleCreateKnowledgeBase = async (data: KnowledgeBaseAddRequest) => {
        try {
            const newKb = await createKnowledgeBase(data);
            showToast({ message: `知识库 "${newKb.name}" 创建成功！`, type: 'success' });
            // 刷新列表，跳转到第一页查看新创建的项
            if (currentPage === 1) {
                fetchData(1);
            } else {
                setCurrentPage(1);
            }
        } catch (error: any) {
            console.error("Failed to create knowledge base:", error.message);
            // 错误提示已由 apiClient 统一处理
        }
    };

    // --- 【核心】: 新增并完善删除处理函数 ---
    const handleDeleteKnowledgeBase = async (id: number) => {
        try {
            await deleteKnowledgeBase(id);
            showToast({ message: `知识库已成功删除`, type: 'success' });

            // 删除成功后，刷新当前页的数据
            // 一个小优化：如果当前页是最后一项被删除，则跳转到前一页
            if (kbPage && kbPage.records.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchData(currentPage);
            }
        } catch (error: any) {
            // 错误提示已由 apiClient 统一处理
            console.error("Failed to delete knowledge base:", error.message);
            // 抛出异常，让卡片组件知道操作失败，可以停止 loading 状态
            throw error;
        }
    };

    return (
        <div className={styles.knowledgeContainer}>
            {/* Header 和 Steps 组件通常不需要修改 */}
            <KnowledgeBaseHeader />
            <KnowledgeSteps
                isVisible={isStepsVisible}
                onToggle={() => setIsStepsVisible(!isStepsVisible)}
            />

            {/* Toolbar 需要能控制上层的筛选状态，暂时保持不变 */}
            <KnowledgeToolbar
                onOpenCreateModal={() => setIsModalOpen(true)}
            />

            {/* Grid 组件现在接收分页后的数据和加载状态 */}
            <KnowledgeGrid
                kbs={kbPage?.records || []}
                isLoading={isLoading}
                onDelete={handleDeleteKnowledgeBase} // 【核心】: 传递删除函数
            />

            {/* 分页组件 */}
            {kbPage && kbPage.total > 0 && (
                <Pagination
                    currentPage={kbPage.current}
                    totalPages={Math.ceil(kbPage.total / kbPage.size)}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* Modal 组件的 onCreate 回调现在是异步的 */}
            <CreateKnowledgeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateKnowledgeBase}
            />
        </div>
    );
}