// src/lib/student-data.ts

export interface Student {
    id: string;
    key: string;
    name: string;
    studentId: string;
    college: string;
    major: string;
    className: string;
    joinDate: string;
}

export const mockStudentData: { [classId: string]: Student[] } = {
    'cls-001': [
        { id: 'stu-01', key: 'stu-01', name: '张三', studentId: '2021030101', college: '计算机科学与技术学院', major: '软件工程', className: '软件工程2101班', joinDate: '2023-09-05' },
        { id: 'stu-02', key: 'stu-02', name: '李四', studentId: '2021030102', college: '计算机科学与技术学院', major: '软件工程', className: '软件工程2101班', joinDate: '2023-09-05' },
    ],
    'cls-002': [
        { id: 'stu-03', key: 'stu-03', name: '王五', studentId: '2021030201', college: '计算机科学与技术学院', major: '网络工程', className: '网络工程2101班', joinDate: '2023-09-06' },
    ],
    'cls-003': [
        { id: 'stu-04', key: 'stu-04', name: '赵六', studentId: '2022040101', college: '艺术与设计学院', major: '数字媒体技术', className: '数字媒体2201班', joinDate: '2024-03-20' },
        { id: 'stu-05', key: 'stu-05', name: '孙七', studentId: '2022040102', college: '艺术与设计学院', major: '数字媒体技术', className: '数字媒体2201班', joinDate: '2024-03-20' },
        { id: 'stu-06', key: 'stu-06', name: '周八', studentId: '2022040103', college: '艺术与设计学院', major: '数字媒体技术', className: '数字媒体2201班', joinDate: '2024-03-21' },
    ],
    'cls-004': [], // 金融学班级暂无学生
    'cls-005': [
        { id: 'stu-07', key: 'stu-07', name: '杨灵涛', studentId: '202003010224', college: '计算机科学与技术学院', major: '软件工程', className: '软件工程2001班', joinDate: '2022-09-10' },
        { id: 'stu-08', key: 'stu-08', name: '吴九', studentId: '202003010225', college: '计算机科学与技术学院', major: '软件工程', className: '软件工程2001班', joinDate: '2022-09-10' },
    ]
};