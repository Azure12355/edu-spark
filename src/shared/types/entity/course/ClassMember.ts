// [!file src/shared/types/entity/course/ClassMember.ts]
export interface ClassMember {
    classId: number;
    userId: number;
    role: string;
    joinedAt: string;
    status: string;
    metadata?: Record<string, any>;
    isDeleted: number;
}