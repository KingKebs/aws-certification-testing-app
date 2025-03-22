export interface Question {
    question: string;
    options: string[];
    correctAnswer: string[]; // Now always an array to handle both single and multiple choice
}