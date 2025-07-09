export interface SubmissionRequestDTO {
    classActivityId: number;
    answers: Record<number, any>; // Key: questionId, Value: answer
}
