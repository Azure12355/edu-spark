// [!file src/shared/types/entity/course/ClassActivity.ts]
export interface ClassActivity {
    id: number;
    classId: number;
    activityTemplateId: number;
    activityType: string;
    title: string;
    description?: string;
    publisherId: number;
    publishAt?: string;
    startAt?: string;
    dueAt?: string;
    settingsOverride?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    isDeleted: number;
}