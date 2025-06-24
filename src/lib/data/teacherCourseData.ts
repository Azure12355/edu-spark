// src/lib/data/teacherCourseData.ts

export interface TeacherCourse {
    id: string;
    name: string;
    term: string;
    studentCount: number;
    classCount: number;
    status: '进行中' | '已结束';
    color: string; // 用于卡片装饰
}

// 扩展后的数据集，共20条记录
export const teacherCourseData: TeacherCourse[] = [
    {
        id: 'cs101',
        name: '数据结构与算法',
        term: '2024-2025 第一学期',
        studentCount: 120,
        classCount: 3,
        status: '进行中',
        color: '#4f46e5', // Indigo
    },
    {
        id: 'phy202',
        name: '大学物理（下）',
        term: '2024-2025 第一学期',
        studentCount: 85,
        classCount: 2,
        status: '进行中',
        color: '#059669', // Emerald
    },
    {
        id: 'eng001',
        name: '高级英语写作',
        term: '2023-2024 第二学期',
        studentCount: 60,
        classCount: 2,
        status: '已结束',
        color: '#64748b', // Slate
    },
    {
        id: 'art301',
        name: '数字媒体艺术导论',
        term: '2024-2025 第一学期',
        studentCount: 45,
        classCount: 1,
        status: '进行中',
        color: '#db2777', // Pink
    },
    {
        id: 'java-adv',
        name: 'Java 高级编程',
        term: '2024-2025 第一学期',
        studentCount: 95,
        classCount: 2,
        status: '进行中',
        color: '#f97316', // Orange
    },
    {
        id: 'history-mod',
        name: '世界现代史',
        term: '2023-2024 第二学期',
        studentCount: 77,
        classCount: 2,
        status: '已结束',
        color: '#6d28d9', // Violet
    },
    // --- 以下为新增数据 ---
    {
        id: 'chem101',
        name: '基础化学实验',
        term: '2024-2025 第一学期',
        studentCount: 150,
        classCount: 4,
        status: '进行中',
        color: '#2563eb', // Blue
    },
    {
        id: 'eco201',
        name: '宏观经济学原理',
        term: '2024-2025 第一学期',
        studentCount: 110,
        classCount: 3,
        status: '进行中',
        color: '#ca8a04', // Amber
    },
    {
        id: 'math303',
        name: '概率论与数理统计',
        term: '2023-2024 第二学期',
        studentCount: 135,
        classCount: 3,
        status: '已结束',
        color: '#475569', // Slate
    },
    {
        id: 'design102',
        name: 'UI/UX 设计基础',
        term: '2024-2025 第一学期',
        studentCount: 55,
        classCount: 1,
        status: '进行中',
        color: '#be185d', // Fuchsia
    },
    {
        id: 'cs205',
        name: '计算机网络',
        term: '2024-2025 第一学期',
        studentCount: 115,
        classCount: 3,
        status: '进行中',
        color: '#4f46e5', // Indigo
    },
    {
        id: 'psy101',
        name: '普通心理学',
        term: '2023-2024 第二学期',
        studentCount: 90,
        classCount: 2,
        status: '已结束',
        color: '#0e7490', // Cyan
    },
    {
        id: 'jpn101',
        name: '初级日语',
        term: '2024-2025 第一学期',
        studentCount: 88,
        classCount: 2,
        status: '进行中',
        color: '#dc2626', // Red
    },
    {
        id: 'mkt300',
        name: '市场营销学',
        term: '2024-2025 第一学期',
        studentCount: 70,
        classCount: 2,
        status: '进行中',
        color: '#059669', // Emerald
    },
    {
        id: 'os-concepts',
        name: '操作系统概念',
        term: '2023-2024 第二学期',
        studentCount: 105,
        classCount: 2,
        status: '已结束',
        color: '#64748b', // Slate
    },
    {
        id: 'linear-algebra',
        name: '线性代数',
        term: '2024-2025 第一学期',
        studentCount: 180,
        classCount: 4,
        status: '进行中',
        color: '#db2777', // Pink
    },
    {
        id: 'film101',
        name: '电影鉴赏',
        term: '2024-2025 第一学期',
        studentCount: 65,
        classCount: 1,
        status: '进行中',
        color: '#f97316', // Orange
    },
    {
        id: 'law101',
        name: '法学导论',
        term: '2023-2024 第二学期',
        studentCount: 98,
        classCount: 2,
        status: '已结束',
        color: '#6d28d9', // Violet
    },
    {
        id: 'web-dev',
        name: 'Web前端开发实践',
        term: '2024-2025 第一学期',
        studentCount: 75,
        classCount: 2,
        status: '进行中',
        color: '#2563eb', // Blue
    },
    {
        id: 'ai-intro',
        name: '人工智能导论',
        term: '2024-2025 第一学期',
        studentCount: 112,
        classCount: 3,
        status: '进行中',
        color: '#ca8a04', // Amber
    }
];