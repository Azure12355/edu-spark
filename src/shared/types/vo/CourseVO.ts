// src/shared/types/vo/CourseVO.ts
import { UserVO } from './UserVO'; // 导入已有的 UserVO 类型

/**
 * @description 课程视图对象（VO），用于在前端安全地展示课程信息。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.CourseVO.java'。
 */
export interface CourseVO {
    /**
     * 课程的唯一标识符
     * @type {number}
     */
    id: number;

    /**
     * 课程名称
     * @type {string}
     */
    name: string;

    /**
     * 课程详细介绍
     * @type {string | null}
     */
    description?: string;

    /**
     * 课程封面URL
     * @type {string | null}
     */
    coverImageUrl?: string;

    /**
     * 课程主题色
     * @type {string | null}
     */
    colorTheme?: string;

    /**
     * 开设学期
     * @type {string | null}
     */
    term?: string;

    /**
     * 状态: 'DRAFT', 'PUBLISHED', 'ARCHIVED'
     * @type {string}
     */
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

    /**
     * 可见性: 'PRIVATE', 'PUBLIC'
     * @type {string}
     */
    visibility: 'PRIVATE' | 'PUBLIC';

    /**
     * 扩展信息
     * @type {Record<string, any> | null}
     */
    metadata?: Record<string, any>;

    /**
     * 创建时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    createdAt: string;

    /**
     * 创建者信息 (脱敏)
     * @type {UserVO}
     */
    creator: UserVO;
}