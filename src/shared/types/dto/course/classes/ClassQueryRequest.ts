// [!file src/shared/types/dto/course/classes/ClassQueryRequest.ts]
import { PageRequest } from '@/shared/types/common';

export interface ClassQueryRequestDTO extends PageRequest {
    courseId?: number;
    teacherId?: number;
    name?: string;
    term?: string;
    status?: string;
    accessLevel?: string;
    monetizationType?: string;
}