import { PageRequest } from '@/shared/types/common';
export interface AssignmentQueryRequestDTO extends PageRequest {
    courseId: number;
    title?: string;
    type?: string;
    templateStatus?: string;
}