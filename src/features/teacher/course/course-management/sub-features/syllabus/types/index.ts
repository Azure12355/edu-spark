/**
 * @file src/features/teacher/course/course-management/sub-features/syllabus/types/index.ts
 * @description 定义课程大纲领域所需的数据类型。
 */

// 与后端 KnowledgePoint.java 对应
export interface KnowledgePoint {
    id: number;
    sectionId: number;
    title: string;
    type: '核心' | '重点' | '选学';
    difficulty?: '简单' | '中等' | '困难';
    content?: string;
    orderIndex: number;
    metadata?: any;
    createdAt: string;
    updatedAt: string;
}

// 与后端 SyllabusVO.SectionVO 对应
export interface SectionVO {
    id: number;
    chapterId: number;
    title: string;
    orderIndex: number;
    points: KnowledgePoint[];
}

// 与后端 SyllabusVO.ChapterVO 对应
export interface ChapterVO {
    id: number;
    courseId: number;
    title: string;
    description: string;
    orderIndex: number;
    sections: SectionVO[];
}

// 与后端 SyllabusVO 对应
export interface SyllabusVO {
    chapters: ChapterVO[];
}

// 用于统一删除节点的类型
export type SyllabusNodeType = 'chapter' | 'section' | 'point';