// [!file src/features/student/assignment/plaza/hooks/useAssignmentPlaza.ts]
import { useState } from 'react';
import { ClassActivityVO, UserVO } from "@/shared/types";

// --- 创建模拟数据 ---
// 模拟一个发布者用户
const mockPublisher: UserVO = {
    id: 101,
    username: 'teacher_wang',
    nickname: '王老师',
    avatarUrl: '/default-avatar.jpg',
    role: 'TEACHER',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
};

// 模拟不同状态的活动列表
const mockActivities: ClassActivityVO[] = [
    {
        id: 1,
        title: '第一章：数据结构基础测试',
        description: '检验您对线性表、栈和队列的理解程度。',
        activityType: 'HOMEWORK',
        status: 'ONGOING', // 进行中
        publishAt: '2024-06-10T10:00:00Z',
        startAt: '2024-06-11T00:00:00Z',
        dueAt: '2024-06-20T23:59:59Z',
        publisher: mockPublisher,
        activityTemplate: { id: 101, originalTitle: '数据结构基础' },
        settingsOverride: { timeLimit: 60, questionCount: 20, totalScore: 100 },
    },
    {
        id: 2,
        title: '期中模拟测验',
        description: '覆盖前五章所有知识点，检验综合能力。',
        activityType: 'QUIZ',
        status: 'NOT_STARTED', // 未开始
        publishAt: '2024-06-15T10:00:00Z',
        startAt: '2024-06-18T09:00:00Z',
        dueAt: '2024-06-18T11:00:00Z',
        publisher: mockPublisher,
        activityTemplate: { id: 102, originalTitle: '期中综合能力' },
        settingsOverride: { timeLimit: 120, questionCount: 50, totalScore: 100 },
    },
    {
        id: 3,
        title: '第二章：算法复杂度分析',
        description: '深入理解时间与空间复杂度的计算。',
        activityType: 'HOMEWORK',
        status: 'ENDED', // 已结束
        publishAt: '2024-05-20T10:00:00Z',
        startAt: '2024-05-21T00:00:00Z',
        dueAt: '2024-05-30T23:59:59Z',
        publisher: mockPublisher,
        activityTemplate: { id: 103, originalTitle: '算法复杂度' },
        settingsOverride: { questionCount: 15, totalScore: 100, studentScore: 85 }, // 已完成并有分数
    },
    {
        id: 4,
        title: '第三章：树与二叉树练习',
        description: '包含二叉树的遍历、构造和应用等题目。',
        activityType: 'HOMEWORK',
        status: 'ONGOING',
        publishAt: '2024-06-12T10:00:00Z',
        startAt: '2024-06-13T00:00:00Z',
        dueAt: '2024-06-25T23:59:59Z',
        publisher: mockPublisher,
        activityTemplate: { id: 104, originalTitle: '树与二叉树' },
        settingsOverride: { questionCount: 25, totalScore: 100 },
    },
    {
        id: 5,
        title: '结课大作业：综合编程题',
        activityType: 'FINAL_EXAM',
        status: 'ENDED',
        publishAt: '2024-06-01T10:00:00Z',
        startAt: '2024-06-02T00:00:00Z',
        dueAt: '2024-06-15T23:59:59Z',
        publisher: mockPublisher,
        activityTemplate: { id: 105, originalTitle: '综合编程' },
        settingsOverride: { questionCount: 5, totalScore: 100, studentScore: 95 },
        description: '设计并实现一个小型图书管理系统，考察综合编程与设计能力。',
    }
];

// 定义筛选条件类型
export type FilterType = 'all' | 'ongoing' | 'not_started' | 'ended';

/**
 * 为练习广场提供数据和业务逻辑的 Hook
 */
export const useAssignmentPlaza = () => {
    // 模拟加载状态
    const [isLoading, setIsLoading] = useState(false);
    // 模拟活动列表
    const [activities, setActivities] = useState<ClassActivityVO[]>(mockActivities);
    // 筛选状态
    const [filter, setFilter] = useState<FilterType>('all');
    // 搜索关键词
    const [searchQuery, setSearchQuery] = useState('');

    // TODO: 未来将在这里实现从 API 获取数据的逻辑
    // useEffect(() => {
    //   fetchActivities();
    // }, []);

    const filteredActivities = activities.filter(activity => {
        const matchesFilter = filter === 'all' || activity.status.toLowerCase().includes(filter);
        const matchesSearch = searchQuery === '' || activity.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return {
        isLoading,
        activities: filteredActivities,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
    };
};