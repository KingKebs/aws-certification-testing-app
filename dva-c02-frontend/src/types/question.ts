/* 
    This file contains the types for the question and the response
    that the backend returns when a user submits the answers.
    You can modify this file to add any other fields that your
    backend returns in the response.
*/
export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string | string[];  // Can be single answer or array of answers
    isMultipleChoice?: boolean;       // Flag for multiple choice questions
    requiredSelections?: number;      // Number of required selections for multiple choice
}
export interface SubmitAnswer {
    questionId: number;
    selectedOption: string;
}

export interface SubmissionResult {
    score: number;
    totalQuestions: number;
    percentageScore: number;
    results: {
        questionId: number;
        correct: boolean;
    }[];
}