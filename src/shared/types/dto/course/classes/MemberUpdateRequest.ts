// [!file src/shared/types/dto/course/classes/MemberUpdateRequest.ts]
export interface MemberUpdateRequestDTO {
    role?: string;
    status?: string;
    metadata?: Record<string, any>;
}