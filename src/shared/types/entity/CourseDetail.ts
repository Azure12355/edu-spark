// src/shared/types/entity/CourseDetail.ts

// --- 嵌套类型定义，对应 CourseDetail.java 中的内部静态类 ---

/**
 * 学习目标项
 */
export interface LearningObjectiveItem {
    icon: string;
    title: string;
    description: string;
}

/**
 * 考核方式项
 */
export interface AssessmentItem {
    item: string;
    weight: string;
}

/**
 * 学习时间线项
 */
export interface TimelineItem {
    week: string;
    title: string;
    description: string;
    icon: string;
}

/**
 * 推荐书籍项
 */
export interface BookItem {
    title: string;
    author: string;
    coverUrl: string;
    themeColor: string;
}

/**
 * 在线资源项
 */
export interface OnlineResourceItem {
    name: string;
    url: string;
}

/**
 * 技术栈项
 */
export interface TechStackItem {
    name: string;
    icon: string;
    color: string;
}


// --- 主实体类型定义 ---

/**
 * @description 与后端 'com.weilanx.eduspark.model.entity.CourseDetail' 类完全对应的 TypeScript 类型。
 * 代表数据库中的课程详情实体，包含大量结构化的 JSONB 数据。
 */
export interface CourseDetail {
    /**
     * [主键/外键] 关联的课程ID (courses.id)
     * @type {number}
     */
    courseId: number;

    /**
     * 课程的详细介绍 (Markdown 或 HTML)
     * @type {string | null}
     */
    introduction?: string;

    /**
     * 课程核心知识点的简短文字总结
     * @type {string | null}
     */
    keyKnowledge?: string;

    /**
     * 课程预计的总学习时长（小时）
     * @type {number | null}
     */
    estimatedHours?: number;

    /**
     * 结构化的学习目标列表 (JSONB)
     * @type {LearningObjectiveItem[] | null}
     */
    learningObjectives?: LearningObjectiveItem[];

    /**
     * 结构化的学习方法列表 (JSONB)
     * @type {string[] | null}
     */
    learningMethods?: string[];

    /**
     * 结构化的考核方式及其权重列表 (JSONB)
     * @type {AssessmentItem[] | null}
     */
    assessmentMethods?: AssessmentItem[];

    /**
     * 结构化的学习路线图或时间线 (JSONB)
     * @type {TimelineItem[] | null}
     */
    learningTimeline?: TimelineItem[];

    /**
     * 推荐书籍列表 (JSONB)
     * @type {BookItem[] | null}
     */
    recommendedBooks?: BookItem[];

    /**
     * 推荐的在线学习资源列表 (JSONB)
     * @type {OnlineResourceItem[] | null}
     */
    onlineResources?: OnlineResourceItem[];

    /**
     * 课程涉及的技术栈或所需工具列表 (JSONB)
     * @type {TechStackItem[] | null}
     */
    techStack?: TechStackItem[];

    /**
     * 记录最后更新时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    updatedAt: string;
}