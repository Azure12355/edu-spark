export interface AssignmentUpdateRequestDTO {
    title?: string;
    description?: string;
    type?: string;
    templateStatus?: string;
    config?: Record<string, any>;
}