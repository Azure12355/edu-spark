// [!file src/shared/types/entity/assignment/Assignment.ts]
export interface Assignment {
    id: number;
    courseId: number;
    creatorId: number;
    title: string;
    description?: string;
    type: string;
    templateStatus: string;
    config?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    isDeleted: number;
}