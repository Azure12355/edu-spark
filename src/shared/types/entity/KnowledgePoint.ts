// src/shared/types/entity/KnowledgePoint.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.KnowledgePoint' 类完全对应的 TypeScript 类型。
 * 代表数据库中的完整知识点实体。
 */
export interface KnowledgePoint {
    /**
     * 知识点的唯一标识符，主键
     * @type {number}
     */
    id: number | string;

    /**
     * [逻辑外键] 所属小节ID (course_sections.id)
     * @type {number}
     */
    sectionId: number;

    /**
     * 知识点标题
     * @type {string}
     */
    title: string;

    /**
     * 类型: '核心', '重点', '选学'
     * @type {string}
     */
    type: string;

    /**
     * 难度: '简单', '中等', '困难'
     * @type {string | null}
     */
    difficulty?: string;

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
     * 扩展信息，如 tags, view_count (JSONB)
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
     * 逻辑删除标记 (0: 未删除, 1: 已删除)
     * @type {number}
     */
    isDeleted: number;
}