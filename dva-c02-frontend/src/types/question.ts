// src/types/question.ts
export interface Question {
    id: number;
    question: string;
    options: string[];
    isMultipleChoice?: boolean;
}

export interface QuestionResult {
    questionId: number;
    correct: boolean;
    userAnswer: string[];
    correctAnswer: string[];
    question: string;
}

export interface SubmissionResult {
    results: QuestionResult[];
    score: number;
    total: number;  // Added this to match the API response
}
