// [!file src/shared/types/entity/course/Class.ts]
export interface Class {
    id: number;
    courseId: number;
    teacherId: number;
    name: string;
    term: string;
    accessLevel: string;
    enrollmentCode?: string;
    monetizationType: string;
    price?: number;
    settings?: Record<string, any>;
    startDate?: string;
    endDate?: string;
    status: string;
    maxMembers?: number;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    isDeleted: number;
}