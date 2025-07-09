// [!file src/shared/types/dto/course/classes/ClassCreateRequest.ts]
export interface ClassCreateRequestDTO {
    courseId: number;
    name: string;
    term: string;
    accessLevel: string;
    enrollmentCode?: string;
    monetizationType: string;
    price?: number;
    startDate?: string;
    endDate?: string;
    maxMembers?: number;
    settings?: Record<string, any>;
    metadata?: Record<string, any>;
}