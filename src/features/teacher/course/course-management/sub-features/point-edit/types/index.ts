// [!file src/features/teacher/course/course-management/sub-features/point-edit/types/index.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/point-edit/types/index.ts
 * @description 定义知识点编辑领域所需的核心数据类型。
 */

// 1. 知识点详情视图对象 (VO) - 用于从后端获取的完整数据结构
//    这与 point-detail 领域的 KnowledgePointDetailVO 完全一致，用于接收数据。
export interface KnowledgePointDetailVO {
    id: number;
    title: string;
    type: '核心' | '重点' | '选学';
    difficulty?: '简单' | '中等' | '困难';
    content?: string;
    orderIndex: number;
    metadata?: {
        tags?: string[];
        [key: string]: any;
    };
    createdAt: string;
    updatedAt: string;
    // ... 关联信息，虽然编辑页主要关注知识点本身，但获取时可能包含这些
    section: { id: number; title: string; };
    chapter: { id: number; title: string; };
    course: { id: number; name: string; };
    creator: { id: number; nickname: string; };
}

// 2. 知识点更新请求体 (DTO) - 用于向后端发送更新请求
//    与后端的 PointUpdateRequest.java 精确对应
export interface PointUpdateRequestDTO {
    id: number;
    title?: string;
    type?: '核心' | '重点' | '选学';
    difficulty?: '简单' | '中等' | '困难';
    content?: string;
    metadata?: {
        tags?: string[];
        [key: string]: any;
    };
    // orderIndex 通常通过拖拽排序的专门接口处理，这里不包含
}

// 3. 用于在前端组件内部管理状态的本地知识点模型
//    它是一个可编辑的、简化的版本，只包含用户可以修改的字段。
export interface LocalEditablePoint {
    id: number;
    title: string;
    content: string;
    type: '核心' | '重点' | '选学';
    difficulty: '简单' | '中等' | '困难';
    tags: string[];
}