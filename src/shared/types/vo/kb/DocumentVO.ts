// src/shared/types/vo/kb/DocumentVO.ts

/**
 * @description 文档视图对象（VO），用于在前端安全、友好地展示文档信息。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.kb.DocumentVO.java'。
 */
export interface DocumentVO {
    /**
     * 文档的唯一ID
     * @type {number}
     */
    id: number;

    /**
     * 所属知识库ID
     * @type {number}
     */
    knowledgeBaseId: number;

    /**
     * 文档名称
     * @type {string}
     */
    name: string;

    /**
     * 文件MIME类型
     * @type {string | null}
     */
    type?: string;

    /**
     * 文件大小（字节）
     * @type {number | null}
     */
    size?: number;

    /**
     * 处理状态: 0(待处理), 1(处理中), 2(处理完毕), 9(失败)
     * @type {number}
     */
    status: number;

    /**
     * 生成的切片数量
     * @type {number | null}
     */
    sliceCount?: number;

    /**
     * 文件的CDN或临时访问URL
     * @type {string | null}
     */
    cosUrl?: string;

    /**
     * 文档的在线预览链接(HTML格式)
     * @type {string | null}
     */
    previewUrl?: string;

    /**
     * 处理失败时的错误信息
     * @type {string | null}
     */
    errorMessage?: string;

    /**
     * 创建时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    createdAt: string;
}