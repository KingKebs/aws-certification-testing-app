/*
    * This file contains the types for the questions and submission results
    * that are used in the application.
    */
export interface Question {
    id: number;
    question: string;
    options: string[];
    isMultipleChoice?: boolean;
}

export interface SubmissionResult {
    score: number;
    totalQuestions: number;
    percentageScore: number;
    passingScore: boolean;
    results: {
        questionId: number;
        correct: boolean;
        userAnswer: string | string[];
        correctAnswer: string[];
        question: string;
    }[];
}
