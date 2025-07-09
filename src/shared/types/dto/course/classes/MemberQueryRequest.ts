// [!file src/shared/types/dto/course/classes/MemberQueryRequest.ts]
import { PageRequest } from '@/shared/types/common';

export interface MemberQueryRequestDTO extends PageRequest {
    classId: number; // classId 是必须的
    role?: string;
    status?: string;
    userKeyword?: string;
}