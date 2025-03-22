// dva-c02-Backend/src/controllers/questionController.ts
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

interface Question {
    id: number;
    question: string;
    options: string[];
    correct_answers: string[];
}

interface SubmitAnswer {
    questionId: number;
    selectedOption: string | string[];
}

interface SubmissionResult {
    questionId: number;
    correct: boolean;
    userAnswer: string | string[];
    correctAnswer: string[];
    question: string;
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
            // Return questions without correct answers for the frontend
            const sanitizedQuestions = this.questions.map(q => ({
                id: q.id,
                question: q.question,
                options: q.options
            }));
            res.json(sanitizedQuestions);
        } catch (error) {
            console.error('Error fetching questions:', error);
            res.status(500).json({ error: 'Failed to fetch questions' });
        }
    }

    checkAnswer(req: Request, res: Response): void {
        try {
            const { questionId, selectedOption } = req.body;

            if (questionId === undefined || selectedOption === undefined) {
                res.status(400).json({ error: 'Missing required parameters' });
                return;
            }

            const question = this.questions.find(q => q.id === questionId);

            if (!question) {
                res.status(404).json({ error: 'Question not found' });
                return;
            }

            const isCorrect = Array.isArray(selectedOption)
                ? this.arraysEqual(selectedOption.sort(), question.correct_answers.sort())
                : question.correct_answers.includes(selectedOption);

            res.json({
                correct: isCorrect,
                correctAnswer: question.correct_answers
            });
        } catch (error) {
            console.error('Error checking answer:', error);
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

            const results: SubmissionResult[] = answers.map(answer => {
                const question = this.questions.find(q => q.id === answer.questionId);
                
                if (!question) {
                    throw new Error(`Question with ID ${answer.questionId} not found`);
                }

                const isCorrect = Array.isArray(answer.selectedOption)
                    ? this.arraysEqual(answer.selectedOption.sort(), question.correct_answers.sort())
                    : question.correct_answers.includes(answer.selectedOption);

                return {
                    questionId: answer.questionId,
                    correct: isCorrect,
                    userAnswer: answer.selectedOption,
                    correctAnswer: question.correct_answers,
                    question: question.question
                };
            });

            const score = results.filter(r => r.correct).length;
            const totalQuestions = results.length;
            const percentageScore = (score / totalQuestions) * 100;

            res.json({
                score,
                totalQuestions,
                percentageScore,
                passingScore: percentageScore >= 72, // AWS exam passing score
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

    // Helper method to compare arrays (for multiple choice questions)
    private arraysEqual(a: string[], b: string[]): boolean {
        if (a.length !== b.length) return false;
        return a.every((val, index) => val === b[index]);
    }

    // For testing/debugging purposes
    getQuestionsWithAnswers(req: Request, res: Response): void {
        try {
            res.json(this.questions);
        } catch (error) {
            console.error('Error fetching questions with answers:', error);
            res.status(500).json({ error: 'Failed to fetch questions with answers' });
        }
    }
}

export default QuestionController;
