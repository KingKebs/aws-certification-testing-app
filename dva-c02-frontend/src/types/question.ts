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