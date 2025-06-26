// src/lib/data/teacherAssistantCourseData.ts

export interface TeacherCourse {
    id: string;
    name: string;
    term: string; // e.g., '2024-2025 第一学期'
    icon: string; // Font Awesome icon class
    color: string; // Hex color for icon/theme
    knowledgeBaseCount: number;
}

export const mockTeacherCourses: TeacherCourse[] = [
    {
        id: 'cs101',
        name: '数据结构与算法',
        term: '2024-2025 第一学期',
        icon: 'fas fa-sitemap',
        color: '#4f46e5',
        knowledgeBaseCount: 5,
    },
    {
        id: 'phy202',
        name: '大学物理（下）',
        term: '2024-2025 第一学期',
        icon: 'fas fa-atom',
        color: '#059669',
        knowledgeBaseCount: 3,
    },
    {
        id: 'art301',
        name: '数字媒体艺术导论',
        term: '2023-2024 第二学期',
        icon: 'fas fa-palette',
        color: '#db2777',
        knowledgeBaseCount: 8,
    },
    {
        id: 'java-adv',
        name: 'Java 高级编程',
        term: '2024-2025 第一学期',
        icon: 'fab fa-java',
        color: '#f97316',
        knowledgeBaseCount: 12,
    },
    {
        id: 'os202',
        name: '操作系统原理',
        term: '2023-2024 第二学期',
        icon: 'fas fa-microchip',
        color: '#5F9EA0',
        knowledgeBaseCount: 2,
    },
];