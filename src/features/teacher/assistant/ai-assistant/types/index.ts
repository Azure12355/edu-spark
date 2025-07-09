// [!file src/features/teacher/assistant/ai-assistant/types/index.ts]
/**
 * 定义教学大纲中一个节点的类型
 */
export type SyllabusNodeType = 'course' | 'chapter' | 'section' | 'point';

/**
 * 定义当前选中的大纲节点的数据结构
 */
export interface SelectedSyllabusNode {
    type: SyllabusNodeType;
    // 课程ID可能是字符串，而章节等ID是数字
    id: number | string;
    name: string;
}