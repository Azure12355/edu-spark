// src/shared/types/enums/EnrollmentRoleEnum.ts
export enum EnrollmentRoleEnum {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
}
export const EnrollmentRoleTextMap: Record<EnrollmentRoleEnum, string> = {
    [EnrollmentRoleEnum.STUDENT]: '学生',
    [EnrollmentRoleEnum.TEACHER]: '助教', // 教师角色通常在课程中定义，报名时一般是助教
};