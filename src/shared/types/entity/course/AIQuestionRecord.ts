// src/shared/types/entity/AIQuestionRecord.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.AIQuestionRecord' 类完全对应的 TypeScript 类型。
 * 代表一条由AI生成的、待审核的题目记录。
 */
export interface AIQuestionRecord {
    /**
     * 自增主键
     * @type {number}
     */
    id: number;

    /**
     * 记录的全局唯一业务ID
     * @type {string}
     */
    recordUuid: string;

    /**
     * [逻辑外键] 创建者ID
     * @type {number}
     */
    creatorId: number;

    /**
     * [逻辑外键] 关联的课程ID
     * @type {number | null}
     */
    courseId?: number;

    /**
     * 本次生成所依据的知识点ID列表 (JSONB数组)
     * @type {number[] | null}
     */
    sourceKnowledgePointIds?: number[];

    /**
     * 发起生成请求的前端完整参数 (JSONB)
     * @type {Record<string, any>}
     */
    requestParams: Record<string, any>;

    /**
     * 最终组装后发送给大模型的完整提示词
     * @type {string | null}
     */
    finalPrompt?: string;

    /**
     * 使用的大模型名称和版本
     * @type {string | null}
     */
    modelUsed?: string;

    /**
     * 题目类型
     * @type {string}
     */
    type: string;

    /**
     * 题目难度
     * @type {string}
     */
    difficulty: string;

    /**
     * 题干内容 (Markdown)
     * @type {string}
     */
    stem: string;

    /**
     * 选择题选项数组 (JSONB)
     * @type {string[] | null}
     */
    options?: string[];

    /**
     * 正确答案数组 (JSONB)
     * @type {string[]}
     */
    answers: string[];

    /**
     * 题目解析数组 (JSONB)
     * @type {string[] | null}
     */
    analyses?: string[];

    /**
     * 从大模型获取的原始、未经处理的完整响应文本
     * @type {string | null}
     */
    rawResponse?: string;

    /**
     * AI题目生成完成的时间 (ISO 8601 格式的字符串)
     * @type {string | null}
     */
    generatedAt?: string;

    /**
     * 处理本次生成的总耗时（毫秒）
     * @type {number | null}
     */
    processingTimeMs?: number;

    /**
     * 大模型返回的Token用量 (JSONB)
     * @type {Record<string, any> | null}
     */
    tokenUsage?: Record<string, any>;

    /**
     * 记录的生命周期状态
     * @type {string}
     */
    status: string;

    /**
     * 审核意见或丢弃原因
     * @type {string | null}
     */
    reviewComment?: string;

    /**
     * 如果该题目被批准并加入题库，此处记录其在 questions 表中的主键ID
     * @type {number | null}
     */
    importedQuestionId?: number;

    /**
     * 逻辑删除标记 (0: 未删除, 1: 已删除)
     * @type {number}
     */
    isDeleted: number;

    /**
     * 记录最后更新时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    updatedAt: string;

    /**
     * 记录创建时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    createdAt: string;
}