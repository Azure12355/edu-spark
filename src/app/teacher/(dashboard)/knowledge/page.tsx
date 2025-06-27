"use client";
import React, { useState, useMemo, useEffect } from 'react';
import styles from './knowledge.module.css';
import KnowledgeBaseHeader from '@/components/teacher/knowledge/home/KnowledgeBaseHeader/KnowledgeBaseHeader';
import KnowledgeSteps from '@/components/teacher/knowledge/home/KnowledgeSteps/KnowledgeSteps';
import KnowledgeToolbar from '@/components/teacher/knowledge/home/KnowledgeToolbar/KnowledgeToolbar';
import KnowledgeGrid from '@/components/teacher/knowledge/home/KnowledgeGrid/KnowledgeGrid';
import CreateKnowledgeModal from '@/components/teacher/knowledge/home/CreateKnowledgeModal/CreateKnowledgeModal';
import Pagination from '@/components/common/Pagination/Pagination'; // 1. 引入分页组件
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { KnowledgeFormatType } from '@/types/knowledge';
import { useToast } from '@/hooks/useToast';

const ITEMS_PER_PAGE = 8; // 2. 定义每页显示的数量

export default function KnowledgePage() {
    const [isStepsVisible, setIsStepsVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 3. 新增分页状态
    const [currentPage, setCurrentPage] = useState(1);

    const {
        knowledgeBases,
        filterStatus,
        filterType,
        searchTerm,
        sortBy,
        addKnowledgeBase
    } = useKnowledgeStore();
    const showToast = useToast();

    // 4. 将筛选和排序逻辑移到主页面
    const filteredAndSortedKbs = useMemo(() => {
        let processedData = [...knowledgeBases];
        // 筛选逻辑... (与之前在 Grid 组件中的逻辑完全相同)
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
        // 排序逻辑... (与之前在 Grid 组件中的逻辑完全相同)
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

    // 5. 当筛选条件变化时，自动重置到第一页
    useEffect(() => {
        setCurrentPage(1);
    }, [filterStatus, filterType, searchTerm, sortBy]);

    // 6. 计算总页数和当前页的数据
    const totalPages = Math.ceil(filteredAndSortedKbs.length / ITEMS_PER_PAGE);
    const currentKbs = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredAndSortedKbs.slice(startIndex, endIndex);
    }, [currentPage, filteredAndSortedKbs]);

    const handleCreateKnowledgeBase = (data: { name: string, description: string, format_type: KnowledgeFormatType }) => {
        // ... 创建逻辑保持不变 ...
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
            <KnowledgeToolbar
                onOpenCreateModal={() => setIsModalOpen(true)}
            />
            {/* 7. 将当前页的数据传递给 Grid */}
            <KnowledgeGrid kbs={currentKbs} />

            {/* 8. 渲染 Pagination 组件 */}
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