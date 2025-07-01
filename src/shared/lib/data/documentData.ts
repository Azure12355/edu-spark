// src/lib/data/documentData.ts

export type DocumentStatus = 'completed' | 'processing' | 'error';

export interface Document {
    id: string;
    name: string;
    type: 'docx' | 'md' | 'pdf' | 'txt' | 'pptx' | 'xlsx';
    status: DocumentStatus;
    chunkCount: number;
    importMethod: '本地上传' | 'URL导入';
    uploadTime: string;
    updateTime: string;
}

const fileTypes: Document['type'][] = ['docx', 'md', 'pdf', 'txt', 'pptx', 'xlsx'];
const fileNames = [
    'Python基础语法', '机器学习导论', 'Web安全攻防', '操作系统原理', '深度学习实践', '数据结构与算法'
];
const statuses: DocumentStatus[] = ['completed', 'completed', 'completed', 'processing', 'error'];

export const documentData: Document[] = Array.from({ length: 15 }, (_, i) => {
    const type = fileTypes[i % fileTypes.length];
    const name = `${fileNames[i % fileNames.length]}.${type}`;
    const date = new Date(Date.now() - i * 1000 * 60 * 60 * 24); // 每天一条
    const dateString = date.toISOString().slice(0, 19).replace('T', ' ');

    return {
        id: `_sys_auto_gen_doc_id-${Date.now() - i * 100000}`,
        name,
        type,
        status: statuses[i % statuses.length],
        chunkCount: Math.floor(Math.random() * 10) + 1,
        importMethod: '本地上传',
        uploadTime: dateString,
        updateTime: dateString,
    };
});

// Helper to get file icon
export const getFileIcon = (type: Document['type']) => {
    switch(type) {
        case 'docx': return { icon: 'fa-file-word', color: '#2a5699' };
        case 'md': return { icon: 'fa-file-alt', color: '#6c757d' };
        case 'pdf': return { icon: 'fa-file-pdf', color: '#d93025' };
        case 'txt': return { icon: 'fa-file-alt', color: '#6c757d' };
        case 'pptx': return { icon: 'fa-file-powerpoint', color: '#d24726' };
        case 'xlsx': return { icon: 'fa-file-excel', color: '#1d6f42' };
        default: return { icon: 'fa-file', color: '#6c757d' };
    }
}