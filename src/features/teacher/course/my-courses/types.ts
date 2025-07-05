/**
 * @file src/features/teacher/course/my-courses/types.ts
 * @description 定义“我的课程”领域相关的数据类型。
 */

// 与后端 UserVO.java 对应，表示脱敏后的用户信息
export interface UserVO {
    id: number;
    username: string;
    nickname: string;
    avatarUrl?: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN';
}

// 与后端 CourseVO.java 对应
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

// 与后端 Page<T> 泛型响应对应
export interface Page<T> {
    records: T[];
    total: number;
    size: number;
    current: number;
    pages: number;
}


// 用于构建分页和筛选的请求体
export interface CourseQueryRequest {
    current: number;
    pageSize: number;
    name?: string;
    term?: string;
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    visibility?: 'PRIVATE' | 'PUBLIC';
    sortField?: string;
    creatorId?: number;
    sortOrder?: 'ascend' | 'descend';
}

/**
 * 与后端 CourseBatchDeleteRequest.java 对应。
 * 用于批量删除课程的请求体。
 */
export interface CourseBatchDeleteRequest {
    ids: number[];
}