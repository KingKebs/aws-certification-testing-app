/* 
    This file contains the types for the questions and answers.
    The Question type is used to define the structure of the questions.
    The Answer type is used to define the structure of the answers.
*/
export interface Question {
    id: number;
    questionText: string;
    options: string[];
    correctAnswer: number;
}

export interface Answer {
    questionId: number;
    selectedOption: number;
}