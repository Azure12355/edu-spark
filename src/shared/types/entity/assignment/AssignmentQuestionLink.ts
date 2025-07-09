// [!file src/shared/types/entity/assignment/AssignmentQuestionLink.ts]
export interface AssignmentQuestionLink {
    assignmentId: number;
    questionId: number;
    score: number;
    orderIndex: number;
    isDeleted: number;
}