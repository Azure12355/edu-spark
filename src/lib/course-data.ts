// src/lib/course-data.ts

export interface Course {
    id: string;
    title: string;
    instructor: string;
    description: string;
    avatarColor: string;
    avatarText: string;
    studentCount: number;
    lastUpdated: string;
    tags: string[];
    isCreator?: boolean;
}

export const myCreatedCourses: Course[] = [
    {
        id: 'C-001',
        title: '嵌入式Linux开发实践教程',
        instructor: '王老师',
        description: '本课程深入讲解嵌入式Linux系统开发的核心技术，从环境搭建到驱动开发，结合项目实践，培养学生解决实际工程问题的能力。',
        avatarColor: '#1677FF',
        avatarText: '嵌',
        studentCount: 85,
        lastUpdated: '2024-05-20',
        tags: ['计算机', '实践课', '热门'],
        isCreator: true,
    },
    {
        id: 'C-002',
        title: 'Python数据分析与可视化',
        instructor: '王老师',
        description: '学习使用Python进行数据处理、分析和可视化的主流库，如NumPy, Pandas, Matplotlib和Seaborn，并通过真实数据集进行案例分析。',
        avatarColor: '#52C41A',
        avatarText: '数',
        studentCount: 120,
        lastUpdated: '2024-05-18',
        tags: ['数据科学', 'Python', '项目驱动'],
        isCreator: true,
    },
    {
        id: 'C-003',
        title: '现代Web前端开发：React篇',
        instructor: '王老师',
        description: '系统学习React框架及其生态，包括组件化、状态管理、路由等核心概念，并使用Next.js构建现代化的服务端渲染应用。',
        avatarColor: '#FAAD14',
        avatarText: 'Web',
        studentCount: 98,
        lastUpdated: '2024-05-15',
        tags: ['计算机', '前端开发', 'React'],
        isCreator: true,
    }
];

export const myJoinedCourses: Course[] = [
    {
        id: 'C-004',
        title: '人工智能导论',
        instructor: '李教授',
        description: '全面介绍人工智能的基本概念、发展历史、主要流派和应用领域，为后续深入学习打下坚实基础。',
        avatarColor: '#722ED1',
        avatarText: 'AI',
        studentCount: 256,
        lastUpdated: '2024-05-10',
        tags: ['人工智能', '理论课'],
        isCreator: false,
    },
    {
        id: 'C-005',
        title: '设计模式与软件架构',
        instructor: '张博士',
        description: '深入探讨23种经典设计模式，并结合大型项目案例分析软件架构的设计原则与演进过程，提升代码质量和系统可维护性。',
        avatarColor: '#F5222D',
        avatarText: '设',
        studentCount: 77,
        lastUpdated: '2024-04-28',
        tags: ['软件工程', '进阶'],
        isCreator: false,
    }
];