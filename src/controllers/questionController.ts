import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

interface Question {
    question: string;
    options: string[];
    correct_answers: string[];
}

class QuestionController {
    private questions: Question[];

    constructor() {
        try {
            const questionsPath = path.join(__dirname, '../data/questions.json');
            const fileContent = fs.readFileSync(questionsPath, 'utf-8');
            this.questions = JSON.parse(fileContent);
        } catch (error) {
            console.error('Error loading questions:', error);
            this.questions = [];
        }
    }

    getQuestions(req: Request, res: Response): void {
        try {
            res.json(this.questions);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch questions' });
        }
    }

    checkAnswer(req: Request, res: Response): void {
        try {
            const { questionIndex, selectedOption } = req.body;

            if (questionIndex === undefined || selectedOption === undefined) {
                res.status(400).json({ error: 'Missing required parameters' });
                return;
            }

            if (questionIndex < 0 || questionIndex >= this.questions.length) {
                res.status(400).json({ error: 'Invalid question index' });
                return;
            }

            const correctAnswer = this.questions[questionIndex].correct_answers;
            const isCorrect = Array.isArray(correctAnswer)
                ? correctAnswer.includes(selectedOption)
                : selectedOption === correctAnswer;

            res.json({ isCorrect });
        } catch (error) {
            res.status(500).json({ error: 'Failed to check answer' });
        }
    }
}

export default QuestionController;