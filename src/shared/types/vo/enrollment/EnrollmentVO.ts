// src/shared/types/vo/enrollment/EnrollmentVO.ts
import { UserVO } from '../UserVO';
import { CourseVO } from '../CourseVO';

/**
 * @description 课程报名记录视图对象（VO），聚合了用户和课程的详细信息。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.enrollment.EnrollmentVO.java'。
 */
export interface EnrollmentVO {
    /**
     * 报名角色: 'TEACHER', 'STUDENT'
     * @type {string}
     */
    role: 'TEACHER' | 'STUDENT';

    /**
     * 报名时间 (ISO 8601 格式的字符串)
     * @type {string}
     */
    enrolledAt: string;

    /**
     * 报名的用户信息 (脱敏)
     * @type {UserVO}
     */
    user: UserVO;

    /**
     * 报名的课程信息 (脱敏)
     * @type {CourseVO}
     */
    course: CourseVO;
}