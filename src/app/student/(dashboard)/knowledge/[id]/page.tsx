"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './knowledgeDetail.module.css';

import { knowledgeData } from '@/lib/data/knowledgeData';
import { documentData } from '@/lib/data/documentData';
import { chunkData } from '@/lib/data/chunkData'; // 引入切片数据

import DocumentHeader from '@/components/student/component/knowledge/detail/DocumentHeader';
import DocumentTabs from '@/components/student/component/knowledge/detail/DocumentTabs';
import DocumentToolbar from '@/components/student/component/knowledge/detail/DocumentToolbar';
import DocumentTable from '@/components/student/component/knowledge/detail/DocumentTable';
import Pagination from '@/components/student/component/knowledge/detail/Pagination';

// 引入新的切片相关组件
import ChunkToolbar from '@/components/student/component/knowledge/detail/ChunkToolbar';
import ChunkGrid from '@/components/student/component/knowledge/detail/ChunkGrid';


export default function KnowledgeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const kbId = params.id as string;

    // 将 "切片详情" 设为默认激活的 Tab
    const [activeTab, setActiveTab] = useState('切片详情');

    const kb = knowledgeData.find(k => k.id === kbId);

    if (!kb) {
        if (typeof window !== 'undefined') {
            router.push('/student/knowledge');
        }
        return <div>知识库不存在...</div>;
    }

    // 根据激活的Tab渲染不同内容
    const renderContent = () => {
        switch(activeTab) {
            case '原始文档':
                return (
                    <div className={styles.contentWrapper}>
                        <DocumentToolbar />
                        <DocumentTable documents={documentData} />
                        <Pagination />
                    </div>
                );
            case '切片详情':
                return (
                    <div className={styles.contentWrapper}>
                        <ChunkToolbar chunkCount={chunkData.length}/>
                        <ChunkGrid />
                        <Pagination /> {/* 复用分页组件 */}
                    </div>
                );
            default:
                return (
                    <div className={styles.contentWrapper} style={{padding: '40px', textAlign: 'center'}}>
                        <p>{activeTab} 功能正在开发中...</p>
                    </div>
                );
        }
    }

    return (
        <div className={styles.pageContainer}>
            <DocumentHeader kb={kb} />
            <DocumentTabs activeTab={activeTab} onTabChange={setActiveTab} />
            {renderContent()}
        </div>
    );
}