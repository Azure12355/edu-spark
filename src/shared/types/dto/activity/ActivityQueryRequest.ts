import { PageRequest } from '@/shared/types/common';
export interface ActivityQueryRequestDTO extends PageRequest {
    classId: number;
    activityType?: string;
}