import { Question } from '../models/question';

class QuestionService {
    private questions: Question[];

    constructor(questions: Question[]) {
        this.questions = questions;
    }

    getQuestions(): Question[] {
        return this.questions;
    }

    checkAnswer(questionIndex: number, selectedOption: string): boolean {
        if (questionIndex < 0 || questionIndex >= this.questions.length) {
            throw new Error('Invalid question index');
        }

        const correctAnswer = this.questions[questionIndex].correctAnswer;
        return Array.isArray(correctAnswer)
            ? correctAnswer.includes(selectedOption)
            : selectedOption === correctAnswer;
    }
}

export default QuestionService;