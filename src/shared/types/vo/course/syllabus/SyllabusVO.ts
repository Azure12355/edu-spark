// src/shared/types/vo/course/syllabus/SyllabusVO.ts

// 1. 导入 KnowledgePoint 类型定义
//    我们直接复用实体类型，因为它不包含敏感信息且字段都是前端需要的。
import { KnowledgePoint } from '@/shared/types/entity/KnowledgePoint';

/**
 * @description 课程小节视图对象（VO），作为 SyllabusVO 的一部分。
 * 对应后端的 'com.weilanx.eduspark.model.vo.course.syllabus.SyllabusVO.SectionVO'。
 */
export interface SectionVO {
    id: number;
    title: string;
    orderIndex: number;
    points: KnowledgePoint[];
}

/**
 * @description 课程章节视图对象（VO），作为 SyllabusVO 的一部分。
 * 对应后端的 'com.weilanx.eduspark.model.vo.course.syllabus.SyllabusVO.ChapterVO'。
 */
export interface ChapterVO {
    id: number;
    title: string;
    description: string;
    orderIndex: number;
    sections: SectionVO[];
}

/**
 * @description 完整的课程大纲视图对象（VO），用于前端展示树形结构的大纲。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.course.syllabus.SyllabusVO.java'。
 */
export interface SyllabusVO {
    chapters: ChapterVO[];
}