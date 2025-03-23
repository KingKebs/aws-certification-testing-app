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
            const parsedQuestions = JSON.parse(fileContent);

            // Add IDs to questions if they don't have them
            this.questions = parsedQuestions.map((q: any, index: number) => ({
                ...q,
                id: index + 1 // Ensure each question has an ID
            }));

            // console.log('Loaded questions count:', this.questions.length);
            // console.log('First few questions:', this.questions.slice(0, 2));

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

    async submitAnswers(req: Request, res: Response) {
        try {
            console.log("Raw request body line 87 backend useQuestions:87:", req.body);
            const { answers } = req.body;

            // Debug information
            console.log('Total questions loaded:', this.questions.length);
            console.log('First few question IDs:', this.questions.slice(0, 5).map(q => q.id));
            console.log('Received answer IDs:', answers.map((a: { questionId: any; }) => a.questionId));

            if (!this.questions || this.questions.length === 0) {
                throw new Error('No questions loaded in the controller');
            }

            // Validate each answer
            for (const answer of answers) {
                if (!answer.questionId || answer.selectedOption === undefined) {
                    console.log("Invalid answer format:", answer);
                    res.status(400).json({ 
                        error: 'Invalid answer format',
                        invalidAnswer: answer 
                    });
                    return;
                }
            }

            const results = answers.map((answer: SubmitAnswer) => {
                const question = this.questions.find(q => q.id === answer.questionId);
                
                if (!question) {
                    console.log('Available question IDs:', this.questions.map(q => q.id));
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

            res.json({
                results,
                score: results.filter((r: SubmissionResult) => r.correct).length,
                total: results.length
            });
            
        } catch (error) {
            console.error("Error submitting answers:", error);
            res.status(500).json({ error: "Internal Server Error" });
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