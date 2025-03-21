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