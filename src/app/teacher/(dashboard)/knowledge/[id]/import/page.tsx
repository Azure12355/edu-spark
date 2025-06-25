"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './import.module.css';

import ImportHeader from '@/components/teacher/knowledge/detail/DocumentTab/DocumentImport/ImportHeader/ImportHeader';
import ImportSourceTabs from '@/components/teacher/knowledge/detail/DocumentTab/DocumentImport/ImportSourceTabs/ImportSourceTabs';
import FileUploadArea from '@/components/teacher/knowledge/detail/DocumentTab/DocumentImport/FileUploadArea/FileUploadArea';
import FileList from '@/components/teacher/knowledge/detail/DocumentTab/DocumentImport/FileList/FileList';
import ImportOptions from '@/components/teacher/knowledge/detail/DocumentTab/DocumentImport/ImportOptions/ImportOptions';
import ImportActions from '@/components/teacher/knowledge/detail/DocumentTab/DocumentImport/ImportActions/ImportActions';

export default function ImportDocumentPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('local');
    const [files, setFiles] = useState<File[]>([]);

    const handleFilesAdded = (newFiles: FileList) => {
        const fileArray = Array.from(newFiles);
        // 简单地追加文件，实际项目可能需要检查重名等
        setFiles(prev => [...prev, ...fileArray]);
    };

    const handleFileDelete = (fileName: string) => {
        setFiles(prev => prev.filter(f => f.name !== fileName));
    };

    const handleImport = () => {
        alert(`${files.length} 个文件已开始导入！`);
        // 在实际项目中，这里会调用API，然后可能清空列表或跳转
        setFiles([]);
    };

    return (
        <div className={styles.pageContainer}>
            <ImportHeader />
            <div className={styles.content}>
                <ImportSourceTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {activeTab === 'local' && (
                    <>
                        <FileUploadArea onFilesAdded={handleFilesAdded} />
                        <FileList files={files} onDelete={handleFileDelete} />
                        <ImportOptions />
                        <ImportActions
                            onImport={handleImport}
                            onCancel={() => router.back()}
                            canImport={files.length > 0}
                        />
                    </>
                )}

                {activeTab !== 'local' && (
                    <div style={{padding: '40px', textAlign: 'center', color: '#6c757d'}}>
                        <p>{`“${activeTab}”导入功能正在开发中...`}</p>
                    </div>
                )}
            </div>
        </div>
    );
}