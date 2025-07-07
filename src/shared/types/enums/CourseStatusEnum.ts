// src/shared/types/enums/CourseStatusEnum.ts
export enum CourseStatusEnum {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED',
}
export const CourseStatusTextMap: Record<CourseStatusEnum, string> = {
    [CourseStatusEnum.DRAFT]: '草稿',
    [CourseStatusEnum.PUBLISHED]: '已发布',
    [CourseStatusEnum.ARCHIVED]: '已归档',
};