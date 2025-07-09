// src/shared/types/enums/DocumentStatusEnum.ts
export enum DocumentStatusEnum {
    PENDING = 0,
    PROCESSING = 1,
    COMPLETED = 2,
    FAILED = 9,
}
export const DocumentStatusTextMap: Record<DocumentStatusEnum, string> = {
    [DocumentStatusEnum.PENDING]: '待处理',
    [DocumentStatusEnum.PROCESSING]: '处理中',
    [DocumentStatusEnum.COMPLETED]: '处理完成',
    [DocumentStatusEnum.FAILED]: '处理失败',
};