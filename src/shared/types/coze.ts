export interface CozeWorkflowInputParameters {
    [key: string]: unknown;
}

export interface GeneratedQuestion {
    stem: string;
    type?: string;
    difficulty?: string;
    options?: string[];
    answers?: string[];
    analyses?: string[];
}

export interface GeneratedQuestionsResponse {
    questions?: GeneratedQuestion[];
    data?: GeneratedQuestion[];
    message?: string;
}

