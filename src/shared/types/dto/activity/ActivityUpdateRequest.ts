export interface ActivityUpdateRequestDTO {
    title?: string;
    description?: string;
    publishAt?: string;
    startAt?: string;
    dueAt?: string;
    settingsOverride?: Record<string, any>;
}