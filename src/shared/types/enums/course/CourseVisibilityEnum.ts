// src/shared/types/enums/CourseVisibilityEnum.ts
export enum CourseVisibilityEnum {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC',
}
export const CourseVisibilityTextMap: Record<CourseVisibilityEnum, string> = {
    [CourseVisibilityEnum.PRIVATE]: '私有',
    [CourseVisibilityEnum.PUBLIC]: '公开',
};