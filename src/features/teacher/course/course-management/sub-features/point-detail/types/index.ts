// [!file src/features/teacher/course/course-management/sub-features/point-detail/types/index.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/point-detail/types/index.ts
 * @description 定义知识点详情领域所需的核心数据类型。
 */

// 1. 基础知识点类型 (与后端的 KnowledgePoint.java 和数据库表对应)
// 这个类型可以被 syllabus 领域复用，但为保证领域独立性，我们在此处也进行定义。
export interface KnowledgePoint {
    id: number;
    sectionId: number;
    title: string;
    type: '核心' | '重点' | '选学';
    difficulty?: '简单' | '中等' | '困难'; // 可选字段
    content?: string; // 知识点详细内容 (Markdown)
    orderIndex: number;
    metadata?: Record<string, any>; // JSONB 字段对应
    createdAt: string; // 后端传来的是 ISO 字符串
    updatedAt: string;
}

// 2. 课程小节视图对象 (SectionVO)
export interface SectionVO {
    id: number;
    chapterId: number;
    title: string;
    orderIndex: number;
    points: KnowledgePoint[];
}

// 3. 课程章节视图对象 (ChapterVO)
export interface ChapterVO {
    id: number;
    courseId: number;
    title: string;
    description: string;
    orderIndex: number;
    sections: SectionVO[];
}

// 4. 完整的大纲视图对象 (SyllabusVO) - 用于渲染侧边栏导航
// 这是一个复用类型，因为它在 syllabus 领域中也有定义
export interface SyllabusVO {
    chapters: ChapterVO[];
    // 可能包含 currentCourseId 等其他元数据
    currentCourseId?: number; // 添加这个字段以匹配 Zustand store
}

// 5. 更新知识点的请求体 (与后端的 PointUpdateRequest.java 对应)
export interface PointUpdateRequest {
    id: number;
    title?: string;
    type?: '核心' | '重点' | '选学';
    difficulty?: '简单' | '中等' | '困难';
    content?: string;
    orderIndex?: number;
    metadata?: Record<string, any>;
}

// [!code focus:start]
// 6. 知识点详情视图对象 (KnowledgePointDetailVO)
// 与后端新定义的 KnowledgePointDetailVO.java 精确对应
export interface KnowledgePointDetailVO {
    id: number;
    title: string;
    type: '核心' | '重点' | '选学';
    difficulty?: '简单' | '中等' | '困难';
    content?: string;
    orderIndex: number;
    metadata?: {
        tags?: string[];
        viewCount?: number;
        likeCount?: number;
        lastReviewed?: string;
        [key: string]: any; // 允许其他未知属性
    };
    createdAt: string;
    updatedAt: string;

    // 嵌套的关联信息
    section: {
        id: number;
        title: string;
    };
    chapter: {
        id: number;
        title: string;
        description?: string;
    };
    course: {
        id: number;
        name: string;
        coverImageUrl?: string;
        colorTheme?: string;
        term?: string;
    };
    creator: { // 使用 UserVO 的部分关键字段或直接 UserVO
        id: number;
        nickname: string;
        username: string;
        avatarUrl?: string;
        role: string;
    };
}
// [!code focus:end]