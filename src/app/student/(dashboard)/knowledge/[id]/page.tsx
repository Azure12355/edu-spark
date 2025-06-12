"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './knowledgeDetail.module.css';

import { knowledgeData } from '@/lib/data/knowledgeData';
import { documentData } from '@/lib/data/documentData';

import DocumentHeader from '@/components/student/component/knowledge/detail/DocumentHeader';
import DocumentTabs from '@/components/student/component/knowledge/detail/DocumentTabs';
import DocumentToolbar from '@/components/student/component/knowledge/detail/DocumentToolbar';
import DocumentTable from '@/components/student/component/knowledge/detail/DocumentTable';
import Pagination from '@/components/student/component/knowledge/detail/Pagination';

export default function KnowledgeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const kbId = params.id as string;

    const [activeTab, setActiveTab] = useState('原始文档');

    const kb = knowledgeData.find(k => k.id === kbId);

    if (!kb) {
        // 实际项目中可能会重定向或显示404页面
        // For now, we can show a simple message or redirect
        if (typeof window !== 'undefined') {
            router.push('/student/knowledge');
        }
        return <div>知识库不存在...</div>;
    }

    return (
        <div className={styles.pageContainer}>
            <DocumentHeader kb={kb} />
            <DocumentTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* 根据激活的Tab渲染不同内容 */}
            {activeTab === '原始文档' && (
                <div className={styles.contentWrapper}>
                    <DocumentToolbar />
                    <DocumentTable documents={documentData} />
                    <Pagination />
                </div>
            )}
            {activeTab !== '原始文档' && (
                <div className={styles.contentWrapper} style={{padding: '40px', textAlign: 'center'}}>
                    <p>{activeTab} 功能正在开发中...</p>
                </div>
            )}
        </div>
    );
}