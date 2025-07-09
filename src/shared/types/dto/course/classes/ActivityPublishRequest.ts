// [!file src/shared/types/dto/course/classes/ActivityPublishRequest.ts]
export interface ActivityPublishRequestDTO {
    activityTemplateId: number;
    title?: string;
    description?: string;
    publishAt: string;
    startAt: string;
    dueAt: string;
    settingsOverride?: Record<string, any>;
}