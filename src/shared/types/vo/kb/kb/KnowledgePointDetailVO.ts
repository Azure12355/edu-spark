// src/shared/types/vo/knowledge/KnowledgePointDetailVO.ts
import { UserVO } from '../../user/UserVO'; // 复用已有的 UserVO

// 嵌套的小节信息
interface SectionInfo {
    id: number;
    title: string;
}

// 嵌套的章节信息
interface ChapterInfo {
    id: number;
    title: string;
    description?: string;
}

// 嵌套的课程信息
interface CourseInfo {
    id: number;
    name: string;
    coverImageUrl?: string;
    colorTheme?: string;
    term?: string;
}

/**
 * @description 知识点详情视图对象（VO），用于展示一个知识点的完整上下文信息。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.knowledge.KnowledgePointDetailVO.java'。
 */
export interface KnowledgePointDetailVO {
    /**
     * 知识点的唯一标识符
     * @type {number}
     */
    id: number;

    /**
     * 知识点标题
     * @type {string}
     */
    title: string;

    /**
     * 知识点类型: '核心', '重点', '选学'
     * @type {string}
     */
    type: '核心' | '重点' | '选学';

    /**
     * 难度: '简单', '中等', '困难'
     * @type {string | null}
     */
    difficulty?: '简单' | '中等' | '困难';

    /**
     * 知识点的详细讲解内容 (Markdown)
     * @type {string | null}
     */
    content?: string;

    /**
     * 知识点显示顺序
     * @type {number}
     */
    orderIndex: number;

    /**
     * 扩展信息，如 tags, view_count
     * @type {Record<string, any> | null}
     */
    metadata?: Record<string, any>;

    /**
     * 创建时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    createdAt: string;

    /**
     * 更新时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    updatedAt: string;

    /**
     * 所属小节信息
     * @type {SectionInfo}
     */
    section: SectionInfo;

    /**
     * 所属章节信息
     * @type {ChapterInfo}
     */
    chapter: ChapterInfo;

    /**
     * 所属课程信息
     * @type {CourseInfo}
     */
    course: CourseInfo;

    /**
     * 课程创建者信息
     * @type {UserVO}
     */
    creator: UserVO;
}