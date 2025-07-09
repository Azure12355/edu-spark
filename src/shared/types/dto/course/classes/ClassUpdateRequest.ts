// [!file src/shared/types/dto/course/classes/ClassUpdateRequest.ts]
export interface ClassUpdateRequestDTO {
    name?: string;
    term?: string;
    accessLevel?: string;
    enrollmentCode?: string;
    monetizationType?: string;
    price?: number;
    startDate?: string;
    endDate?: string;
    maxMembers?: number;
    status?: string;
    settings?: Record<string, any>;
    metadata?: Record<string, any>;
}