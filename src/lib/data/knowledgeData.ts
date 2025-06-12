// src/lib/data/knowledgeData.ts

export type KnowledgeStatus = 'pending' | 'ready' | 'error' | 'building';

export interface KnowledgeBase {
    id: string;
    name: string;
    icon: string; // Font Awesome icon class, e.g., 'fa-book'
    status: KnowledgeStatus;
    creator: string;
    createdAt: string;
    type: '旗舰版' | '专业版' | '基础版';
    fileCount: number;
    chunkCount: number;
}

export const knowledgeData: KnowledgeBase[] = [
    {
        id: 'kb-001',
        name: 'deepforest_konwledge',
        icon: 'fa-file-alt',
        status: 'pending',
        creator: 'root/1069手机用户...',
        createdAt: '2025-04-12 10:01',
        type: '旗舰版',
        fileCount: 0,
        chunkCount: 0,
    },
    {
        id: 'kb-002',
        name: '嵌入式Linux开发教程',
        icon: 'fa-microchip',
        status: 'ready',
        creator: '李教授',
        createdAt: '2025-04-11 15:30',
        type: '旗舰版',
        fileCount: 15,
        chunkCount: 2345,
    },
    {
        id: 'kb-003',
        name: '考研政治核心考点',
        icon: 'fa-landmark',
        status: 'ready',
        creator: '教研组',
        createdAt: '2025-04-10 09:00',
        type: '专业版',
        fileCount: 8,
        chunkCount: 1788,
    },
    {
        id: 'kb-004',
        name: '市场营销案例库',
        icon: 'fa-chart-bar',
        status: 'building',
        creator: '市场部',
        createdAt: '2025-04-12 11:05',
        type: '专业版',
        fileCount: 23,
        chunkCount: 1024,
    },
    {
        id: 'kb-005',
        name: '前端技术文档',
        icon: 'fa-code',
        status: 'error',
        creator: '张老师',
        createdAt: '2025-04-09 18:21',
        type: '基础版',
        fileCount: 5,
        chunkCount: 98,
    },
];