// src/lib/data/myAgentsData.ts

export type AgentType = 'favorite' | 'created' | 'course';

export interface MyAgent {
    id: string;
    name: string;
    type: AgentType;
    creator: string; // 'Me' for created, or others
    description: string;
    lastUsed: string; // e.g., '2小时前', '昨天', '2024-05-10'
    usageCount: number;
    tags: string[];
    icon: string; // Font Awesome icon class
    color: string; // A hex color for the card's theme
    status?: 'published' | 'draft'; // Only for 'created' type
    courseName?: string; // Only for 'course' type
}

export const myAgentsData: MyAgent[] = [
    // --- 我收藏的 ---
    {
        id: 'fav-1',
        name: 'Python 高级编程助教',
        type: 'favorite',
        creator: '李教授',
        description: '深入探讨 Python 的高级特性，包括元类、装饰器和异步编程。',
        lastUsed: '2小时前',
        usageCount: 128,
        tags: ['编程', 'Python', '高级'],
        icon: 'fab fa-python',
        color: '#306998',
    },
    {
        id: 'fav-2',
        name: 'AI 绘画 Prompt 生成器',
        type: 'favorite',
        creator: '设计部',
        description: '帮你构建高质量、富有想象力的 Midjourney 和 Stable Diffusion 提示词。',
        lastUsed: '昨天',
        usageCount: 95,
        tags: ['AI', '艺术', '创意'],
        icon: 'fas fa-palette',
        color: '#8A2BE2',
    },
    {
        id: 'fav-3',
        name: '健身与营养规划师',
        type: 'favorite',
        creator: '力健',
        description: '根据你的身体数据和目标，定制个性化的健身计划和营养食谱。',
        lastUsed: '3天前',
        usageCount: 45,
        tags: ['健康', '健身', '生活'],
        icon: 'fas fa-dumbbell',
        color: '#228B22',
    },

    // --- 我创建的 ---
    {
        id: 'cre-1',
        name: '我的面试准备助手',
        type: 'created',
        creator: 'Me',
        description: '整理了计算机网络、操作系统等常见面试题的个人知识库。',
        lastUsed: '5小时前',
        usageCount: 33,
        tags: ['面试', '计算机', '个人'],
        icon: 'fas fa-user-tie',
        color: '#1E90FF',
        status: 'published',
    },
    {
        id: 'cre-2',
        name: '旅行计划生成器 (草稿)',
        type: 'created',
        creator: 'Me',
        description: '输入目的地和天数，自动规划行程、景点和美食。',
        lastUsed: '1周前',
        usageCount: 5,
        tags: ['旅行', '规划', '草稿'],
        icon: 'fas fa-map-marked-alt',
        color: '#6c757d',
        status: 'draft',
    },

    // --- 我的课程 ---
    {
        id: 'cou-1',
        name: '《数据结构与算法》课程 Agent',
        type: 'course',
        creator: '王老师',
        description: '本课程的官方 AI 助教，解答所有关于链表、树、图和排序算法的疑问。',
        lastUsed: '4天前',
        usageCount: 88,
        tags: ['必修', '数据结构', '算法'],
        icon: 'fas fa-sitemap',
        color: '#D2691E',
        courseName: 'CS101 数据结构与算法',
    },
    {
        id: 'cou-2',
        name: '《操作系统》课程 Agent',
        type: 'course',
        creator: '陈博士',
        description: '深入理解进程、线程、内存管理和文件系统。包含所有课件和习题。',
        lastUsed: '2024-05-10',
        usageCount: 67,
        tags: ['必修', '操作系统'],
        icon: 'fas fa-microchip',
        color: '#5F9EA0',
        courseName: 'CS202 操作系统',
    },
    {
        id: 'cou-3',
        name: '《市场营销学》课程 Agent',
        type: 'course',
        creator: 'Anna',
        description: '覆盖4P理论、STP分析、品牌管理等核心概念，包含大量真实商业案例。',
        lastUsed: '2024-05-08',
        usageCount: 41,
        tags: ['选修', '商科', '营销'],
        icon: 'fas fa-bullhorn',
        color: '#FF6347',
        courseName: 'MKT101 市场营销学',
    },
];