// src/lib/data/teacherCourseData.ts

export type CourseStatus = '进行中' | '已结束' | '未开始';

export interface TeacherCourse {
    id: string;
    name: string;
    creator: string;
    description: string;
    studentCount: number;
    classCount: number;
    status: CourseStatus;
    isFavorite: boolean;
    color: string; // 用于头像背景
}

// 扩展后的数据集，共20条记录
export const teacherCourseData: TeacherCourse[] = [
    {
        id: 'cs101',
        name: '数据结构与算法',
        creator: '王老师',
        description: '这是一个关于数据结构与算法的专业智能体，由王老师创建。它能够提供知识点问答、模拟测验、时事分析等多种能力，帮助学生全面掌握课程内容。',
        studentCount: 120,
        classCount: 3,
        status: '进行中',
        isFavorite: true,
        color: '#4f46e5', // Indigo
    },
    {
        id: 'phy202',
        name: '大学物理（下）',
        creator: '李教授',
        description: '深入探索电磁学、光学和近代物理，本智能体提供公式推导、实验模拟和难题解析。',
        studentCount: 85,
        classCount: 2,
        status: '进行中',
        isFavorite: false,
        color: '#059669', // Emerald
    },
    {
        id: 'eng001',
        name: '高级英语写作',
        creator: '王老师',
        description: '从学术论文到商业信函，本智能体专注于提升你的高级写作技巧，提供语法纠错和风格润色。',
        studentCount: 60,
        classCount: 2,
        status: '已结束',
        isFavorite: true,
        color: '#64748b', // Slate
    },
    {
        id: 'art301',
        name: '数字媒体艺术导论',
        creator: '艺术系',
        description: '探索数字艺术的无限可能，本智能体提供设计工具教程、创作灵感和作品集分析。',
        studentCount: 45,
        classCount: 1,
        status: '进行中',
        isFavorite: false,
        color: '#db2777', // Pink
    },
    {
        id: 'java-adv',
        name: 'Java 高级编程',
        creator: '王老师',
        description: '聚焦于并发编程、JVM调优和微服务架构，为你的Java技术栈添砖加瓦。',
        studentCount: 95,
        classCount: 2,
        status: '进行中',
        isFavorite: false,
        color: '#f97316', // Orange
    },
    {
        id: 'history-mod',
        name: '世界现代史',
        creator: '陈博士',
        description: '从两次世界大战到冷战格局，本智能体带你梳理复杂的现代史脉络，提供深度分析。',
        studentCount: 77,
        classCount: 2,
        status: '已结束',
        isFavorite: false,
        color: '#6d28d9', // Violet
    },
    // --- 新增数据，确保多样性 ---
    {
        id: 'chem101',
        name: '基础化学实验',
        creator: '实验中心',
        description: '提供标准实验流程指导、化学反应模拟和数据处理分析，确保你的实验安全高效。',
        studentCount: 150,
        classCount: 4,
        status: '进行中',
        isFavorite: true,
        color: '#2563eb', // Blue
    },
    {
        id: 'eco201',
        name: '宏观经济学原理',
        creator: '经济学院',
        description: 'GDP、通货膨胀、货币政策... 本智能体用生动的案例和模型帮你理解宏观经济世界。',
        studentCount: 110,
        classCount: 3,
        status: '进行中',
        isFavorite: false,
        color: '#ca8a04', // Amber
    },
    {
        id: 'math303',
        name: '概率论与数理统计',
        creator: '王老师',
        description: '从贝叶斯公式到假设检验，本智能体是你的随身统计学导师，助你攻克数据难关。',
        studentCount: 135,
        classCount: 3,
        status: '已结束',
        isFavorite: false,
        color: '#475569', // Slate
    },
    {
        id: 'design102',
        name: 'UI/UX 设计基础',
        creator: '设计部',
        description: '提供案例检索、配色建议、布局分析等多种能力，帮助你构建用户友好的交互界面。',
        studentCount: 55,
        classCount: 1,
        status: '进行中',
        isFavorite: true,
        color: '#be185d', // Fuchsia
    },
];