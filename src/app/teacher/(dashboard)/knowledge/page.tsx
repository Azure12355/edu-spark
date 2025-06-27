"use client";

import React, { useState, useMemo, useEffect } from 'react';
import styles from './knowledge.module.css';

// --- Store Imports ---
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { useKnowledgeViewStore } from '@/store/knowledgeViewStore'; // 1. 引入新的视图状态管理器

// --- Component Imports ---
import KnowledgeBaseHeader from '@/components/teacher/knowledge/home/KnowledgeBaseHeader/KnowledgeBaseHeader';
import KnowledgeSteps from '@/components/teacher/knowledge/home/KnowledgeSteps/KnowledgeSteps';
import KnowledgeToolbar from '@/components/teacher/knowledge/home/KnowledgeToolbar/KnowledgeToolbar';
import KnowledgeGrid from '@/components/teacher/knowledge/home/KnowledgeGrid/KnowledgeGrid';
import CreateKnowledgeModal from '@/components/teacher/knowledge/home/CreateKnowledgeModal/CreateKnowledgeModal';
import Pagination from '@/components/common/Pagination/Pagination';

// --- Type and Hook Imports ---
import { KnowledgeFormatType } from '@/types/knowledge';
import { useToast } from '@/hooks/useToast';

const ITEMS_PER_PAGE = 8; // 每页显示8个卡片

export default function KnowledgePage() {
    // --- State for UI components that don't need to be global ---
    const [isStepsVisible, setIsStepsVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // --- Getting data and actions from Stores ---
    const { knowledgeBases, addKnowledgeBase } = useKnowledgeStore();
    const {
        filterStatus,
        filterType,
        searchTerm,
        sortBy
    } = useKnowledgeViewStore(); // 2. 从视图Store获取所有UI控制状态

    const showToast = useToast();

    // 3. 核心逻辑：派生出最终要显示的数据列表
    const filteredAndSortedKbs = useMemo(() => {
        let processedData = [...knowledgeBases];

        // 筛选逻辑
        if (filterStatus !== 'ALL') {
            processedData = processedData.filter(kb => kb.status === filterStatus);
        }
        if (filterType !== 'ALL') {
            processedData = processedData.filter(kb => kb.format_type === filterType);
        }
        if (searchTerm.trim()) {
            const lowercasedTerm = searchTerm.toLowerCase();
            processedData = processedData.filter(kb =>
                kb.name.toLowerCase().includes(lowercasedTerm) ||
                (kb.description && kb.description.toLowerCase().includes(lowercasedTerm))
            );
        }

        // 排序逻辑
        processedData.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name, 'zh-CN');
                case 'fork_count':
                    return b.fork_count - a.fork_count;
                case 'updated_at':
                default:
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            }
        });

        return processedData;
    }, [knowledgeBases, filterStatus, filterType, searchTerm, sortBy]);

    // 4. 当筛选条件变化时，自动重置到第一页
    useEffect(() => {
        setCurrentPage(1);
    }, [filterStatus, filterType, searchTerm, sortBy]);

    // 5. 计算分页所需的数据
    const totalPages = Math.ceil(filteredAndSortedKbs.length / ITEMS_PER_PAGE);
    const currentKbsOnPage = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedKbs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, filteredAndSortedKbs]);

    // 6. 处理创建知识库的逻辑（保持不变）
    const handleCreateKnowledgeBase = (data: { name: string, description: string, format_type: KnowledgeFormatType }) => {
        addKnowledgeBase({
            coze_dataset_id: `coze_id_${Date.now()}`,
            owner_id: 'user_teacher_01',
            name: data.name,
            description: data.description,
            format_type: data.format_type,
            visibility: 'PRIVATE',
            fork_count: 0,
            status: 'READY',
            stats: { doc_count: 0, slice_count: 0, hit_count: 0, all_file_size: 0, bot_used_count: 0 },
        });
        showToast({ message: `知识库 "${data.name}" 创建成功！`, type: 'success' });
    };

    return (
        <div className={styles.knowledgeContainer}>
            <KnowledgeBaseHeader />
            <KnowledgeSteps
                isVisible={isStepsVisible}
                onToggle={() => setIsStepsVisible(!isStepsVisible)}
            />
            {/* Toolbar 现在是自给自足的，它会自己从 Store 中获取状态和更新函数 */}
            <KnowledgeToolbar
                onOpenCreateModal={() => setIsModalOpen(true)}
            />
            {/* Grid 组件现在接收分页后的数据 */}
            <KnowledgeGrid kbs={currentKbsOnPage} />

            {/* Pagination 组件接收计算好的分页信息 */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            <CreateKnowledgeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateKnowledgeBase}
            />
        </div>
    );
}