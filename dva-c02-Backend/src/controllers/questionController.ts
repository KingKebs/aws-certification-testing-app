import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

interface Question {
    question: string;
    options: string[];
    correct_answers: string[];
}

interface SubmitAnswer {
    questionId: number;
    selectedOption: string;
}

interface SubmissionResult {
    questionId: number;
    correct: boolean;
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
            // Return questions without correct answers
            const sanitizedQuestions = this.questions.map((q, index) => ({
                id: index,
                question: q.question,
                options: q.options
            }));
            res.json(sanitizedQuestions);
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

    submitAnswers(req: Request, res: Response): void {
        try {
            const { answers } = req.body as { answers: SubmitAnswer[] };

            if (!Array.isArray(answers)) {
                res.status(400).json({ error: 'Invalid submission format' });
                return;
            }

            let score = 0;
            const results: SubmissionResult[] = answers.map(answer => {
                const question = this.questions[answer.questionId];
                if (!question) {
                    throw new Error(`Question with ID ${answer.questionId} not found`);
                }

                const isCorrect = question.correct_answers.includes(answer.selectedOption);
                if (isCorrect) score++;

                return {
                    questionId: answer.questionId,
                    correct: isCorrect
                };
            });

            res.json({
                score,
                totalQuestions: this.questions.length,
                percentageScore: (score / this.questions.length) * 100,
                results
            });

        } catch (error) {
            console.error('Submission error:', error);
            res.status(500).json({ 
                error: 'Failed to process submission',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}

export default QuestionController;
