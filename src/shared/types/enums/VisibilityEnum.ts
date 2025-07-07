// src/shared/types/enums/VisibilityEnum.ts
export enum VisibilityEnum {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC',
}
export const VisibilityTextMap: Record<VisibilityEnum, string> = {
    [VisibilityEnum.PRIVATE]: '私有',
    [VisibilityEnum.PUBLIC]: '公开',
};