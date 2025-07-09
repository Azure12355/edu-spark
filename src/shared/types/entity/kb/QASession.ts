// src/shared/types/entity/QASession.ts

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.QASession' 类完全对应的 TypeScript 类型。
 * 代表一个知识问答（QA）的会话。
 */
export interface QASession {
    /**
     * 自增主键，内部唯一标识
     * @type {number}
     */
    id: number;

    /**
     * 会话的全局唯一业务ID (例如UUID)
     * @type {string}
     */
    sessionUuid: string;

    /**
     * [逻辑外键] 发起会话的用户ID
     * @type {number}
     */
    userId: number;

    /**
     * 会话标题
     * @type {string}
     */
    title: string;

    /**
     * 是否置顶显示
     * @type {boolean}
     */
    isPinned: boolean;

    /**
     * 归档时间戳 (ISO 8601 格式的字符串)
     * @type {string | null}
     */
    archivedAt?: string;

    /**
     * 会话创建时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    createdAt: string;

    /**
     * 会话最后一次交互或更新的时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    updatedAt: string;

    /**
     * 逻辑删除标记 (0: 未删除, 1: 已删除)
     * @type {number}
     */
    isDeleted: number;
}