// src/shared/types/enums/UserRoleEnum.ts
export enum UserRoleEnum {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    ADMIN = 'ADMIN',
}
export const UserRoleTextMap: Record<UserRoleEnum, string> = {
    [UserRoleEnum.STUDENT]: '学生',
    [UserRoleEnum.TEACHER]: '教师',
    [UserRoleEnum.ADMIN]: '管理员',
};