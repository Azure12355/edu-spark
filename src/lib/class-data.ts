// src/lib/class-data.ts

export interface ClassInfo {
    id: string;
    name: string;
    college: string;
    major: string;
    grade: string;
    studentCount: number;
    instructor: string;
    createdDate: string;
    status: 'active' | 'archived';
}

export const mockClassData: ClassInfo[] = [
    {
        id: 'cls-001',
        name: '软件工程2101班',
        college: '计算机科学与技术学院',
        major: '软件工程',
        grade: '2021级',
        studentCount: 45,
        instructor: '王老师',
        createdDate: '2023-09-01',
        status: 'active',
    },
    {
        id: 'cls-002',
        name: '网络工程2101班',
        college: '计算机科学与技术学院',
        major: '网络工程',
        grade: '2021级',
        studentCount: 42,
        instructor: '李老师',
        createdDate: '2023-09-01',
        status: 'active',
    },
    {
        id: 'cls-003',
        name: '数字媒体2201班',
        college: '艺术与设计学院',
        major: '数字媒体技术',
        grade: '2022级',
        studentCount: 38,
        instructor: '刘老师',
        createdDate: '2024-03-15',
        status: 'active',
    },
    {
        id: 'cls-004',
        name: '金融学2001班',
        college: '经济管理学院',
        major: '金融学',
        grade: '2020级',
        studentCount: 55,
        instructor: '赵老师',
        createdDate: '2022-09-01',
        status: 'archived',
    },
    {
        id: 'cls-005',
        name: '软件工程2001班',
        college: '计算机科学与技术学院',
        major: '软件工程',
        grade: '2020级',
        studentCount: 48,
        instructor: '王老师',
        createdDate: '2022-09-01',
        status: 'archived',
    },
];

// 为表单下拉框提供选项
export const collegeOptions = [
    { value: '计算机科学与技术学院', label: '计算机科学与技术学院' },
    { value: '艺术与设计学院', label: '艺术与设计学院' },
    { value: '经济管理学院', label: '经济管理学院' },
    { value: '外国语学院', label: '外国语学院' },
];

export const majorOptions: { [key: string]: { value: string, label: string }[] } = {
    '计算机科学与技术学院': [
        { value: '软件工程', label: '软件工程' },
        { value: '网络工程', label: '网络工程' },
        { value: '计算机科学与技术', label: '计算机科学与技术' },
    ],
    '艺术与设计学院': [
        { value: '数字媒体技术', label: '数字媒体技术' },
        { value: '视觉传达', label: '视觉传达' },
    ],
    '经济管理学院': [
        { value: '金融学', label: '金融学' },
        { value: '工商管理', label: '工商管理' },
    ],
    '外国语学院': [
        { value: '英语', label: '英语' },
        { value: '日语', label: '日语' },
    ]
};