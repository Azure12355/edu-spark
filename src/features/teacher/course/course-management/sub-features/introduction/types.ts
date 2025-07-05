/**
 * @file src/features/teacher/course/course-management/sub-features/introduction/types.ts
 * @description 定义“课程介绍”页面所需的核心数据类型，与后端VO/Entity精确对应。
 */

// 1. 与后端 UserVO.java 对应
export interface UserVO {
    id: number;
    username: string;
    nickname: string;
    avatarUrl?: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN';
}

// 2. 与后端 CourseVO.java 对应 (这是课程的核心信息)
export interface CourseVO {
    id: number;
    name: string;
    description: string;
    coverImageUrl?: string;
    colorTheme?: string;
    term: string;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    visibility: 'PRIVATE' | 'PUBLIC';
    metadata?: any;
    createdAt: string; // ISO Date String
    creator: UserVO;
}

// 3. 与后端 CourseDetail.java 及其内部静态类对应
export interface LearningObjectiveItem {
    icon: string;
    title: string;
    description: string;
}

export interface AssessmentItem {
    item: string;
    weight: string;
}

export interface TimelineItem {
    week: string;
    title: string;
    description: string;
    icon: string;
}

export interface BookItem {
    title: string;
    author: string;
    coverUrl: string;
    themeColor: string;
}

export interface OnlineResourceItem {
    name: string;
    url: string;
}

export interface TechStackItem {
    name: string;
    icon: string;
    color: string;
}

export interface CourseDetail {
    courseId: number;
    introduction?: string;
    keyKnowledge?: string;
    estimatedHours?: number;
    learningObjectives?: LearningObjectiveItem[];
    learningMethods?: string[];
    assessmentMethods?: AssessmentItem[];
    learningTimeline?: TimelineItem[];
    recommendedBooks?: BookItem[];
    onlineResources?: OnlineResourceItem[];
    techStack?: TechStackItem[];
    updatedAt: string; // ISO Date String
}

// 4. [推荐] 创建一个组合类型，方便在 Hook 和组件中使用
export type FullCourseInfo = CourseVO & {
    details: CourseDetail | null;
};