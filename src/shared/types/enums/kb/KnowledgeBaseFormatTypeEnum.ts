// src/shared/types/enums/KnowledgeBaseFormatTypeEnum.ts
export enum KnowledgeBaseFormatTypeEnum {
    TEXT = 0,
    TABLE = 1,
    IMAGE = 2,
}
export const KnowledgeBaseFormatTypeTextMap: Record<KnowledgeBaseFormatTypeEnum, string> = {
    [KnowledgeBaseFormatTypeEnum.TEXT]: '纯文本文档',
    [KnowledgeBaseFormatTypeEnum.TABLE]: '表格数据',
    [KnowledgeBaseFormatTypeEnum.IMAGE]: '图片知识',
};