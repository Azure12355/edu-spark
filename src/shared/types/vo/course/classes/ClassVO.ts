// [!file src/shared/types/vo/course/classes/ClassVO.ts]
import { UserVO } from '../../user';

export interface ClassVO {
    id: number;
    name: string;
    term: string;
    status: string;
    accessLevel: string;
    enrollmentCode?: string;
    monetizationType: string;
    price?: number;
    startDate?: string;
    endDate?: string;
    memberCount?: number;
    maxMembers?: number;
    settings?: Record<string, any>;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    courseTemplate: {
        id: number;
        name: string;
        coverImageUrl?: string;
    };
    teacher: UserVO;
}