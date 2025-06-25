"use client";
import React, { useState } from 'react';
import styles from './knowledge.module.css';
import KnowledgeBaseHeader from '@/components/teacher/knowledge/home/KnowledgeBaseHeader/KnowledgeBaseHeader';
import KnowledgeSteps from '@/components/teacher/knowledge/home/KnowledgeSteps/KnowledgeSteps';
import KnowledgeToolbar from '@/components/teacher/knowledge/home/KnowledgeToolbar/KnowledgeToolbar';
import KnowledgeGrid from '@/components/teacher/knowledge/home/KnowledgeGrid/KnowledgeGrid';
import CreateKnowledgeModal from '@/components/teacher/knowledge/home/CreateKnowledgeModal/CreateKnowledgeModal'; // 引入新组件
import { knowledgeData, KnowledgeBase } from '@/lib/data/knowledgeData'; // 引入类型

export default function KnowledgePage() {
    const [isStepsVisible, setIsStepsVisible] = useState(true);
    // 新增状态：控制弹窗可见性
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 新增状态：管理知识库列表数据
    const [kbs, setKbs] = useState<KnowledgeBase[]>(knowledgeData);

    const toggleStepsVisibility = () => {
        setIsStepsVisible(prev => !prev);
    };

    // 处理创建知识库的逻辑
    const handleCreateKnowledgeBase = (name: string, description: string) => {
        console.log("创建新知识库:", { name, description });
        const newKb: KnowledgeBase = {
            id: `kb-${Date.now()}`,
            name,
            icon: 'fa-file-alt', // 默认图标
            status: 'pending',
            creator: '当前用户', // 应该是动态获取的
            createdAt: new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
            type: '基础版', // 默认类型
            fileCount: 0,
            chunkCount: 0,
        };
        // 更新状态，将新知识库添加到列表最前面
        setKbs(prevKbs => [newKb, ...prevKbs]);
    };

    return (
        <div className={styles.knowledgeContainer}>
            <KnowledgeBaseHeader />
            <KnowledgeSteps
                isVisible={isStepsVisible}
                onToggle={toggleStepsVisibility}
            />
            <KnowledgeToolbar
                count={kbs.length}
                onOpenCreateModal={() => setIsModalOpen(true)} // 传递打开函数
            />
            <KnowledgeGrid kbs={kbs} /> {/* 将动态数据传递给 Grid */}

            {/* 集成弹窗组件 */}
            <CreateKnowledgeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateKnowledgeBase}
            />
        </div>
    );
}