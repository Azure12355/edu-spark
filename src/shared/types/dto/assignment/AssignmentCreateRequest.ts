export interface AssignmentCreateRequestDTO {
    courseId: number;
    title: string;
    description?: string;
    type: string;
}