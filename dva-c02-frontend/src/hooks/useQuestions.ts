import { useState, useEffect } from 'react';
import { Question, SubmissionResult } from '../types/question';

export const useQuestions = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentBatch, setCurrentBatch] = useState<Question[]>([]);
    const [currentBatchNumber, setCurrentBatchNumber] = useState(1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);

    const BATCH_SIZE = 10;
    const API_CONFIG = {
        paths: {
            questions: 'http://localhost:3001/api/questions',
            submit: 'http://localhost:3001/api/questions/submit'
        },
        headers: {
            default: {
                'Content-Type': 'application/json'
            }
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch(API_CONFIG.paths.questions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const processedQuestions: Question[] = data.map((q: any) => ({
                id: q.id,
                question: q.question,
                options: q.options,
                isMultipleChoice: q.options.length > 1
            }));

            setQuestions(processedQuestions);
            setCurrentBatch(processedQuestions.slice(0, BATCH_SIZE));
            setLoading(false);
        } catch (err) {
            console.error('Error fetching questions:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch questions');
            setLoading(false);
        }
    };

    const submitAnswers = async (answers: Record<number, string | string[]>): Promise<SubmissionResult> => {
        try {
            const answersArray = Object.entries(answers).map(([questionId, selectedOption]) => ({
                questionId: parseInt(questionId),
                selectedOption
            }));

            const response = await fetch(API_CONFIG.paths.submit, {
                method: 'POST',
                headers: API_CONFIG.headers.default,
                body: JSON.stringify({ answers: answersArray }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const results: SubmissionResult = await response.json();
            setTotalQuestionsAnswered(prev => prev + currentBatch.length);
            return results;
        } catch (err) {
            console.error('Error submitting answers:', err);
            throw new Error(err instanceof Error ? err.message : 'Failed to submit answers');
        }
    };

    const continueToNextBatch = () => {
        const nextBatchStart = currentBatchNumber * BATCH_SIZE;
        const nextBatch = questions.slice(nextBatchStart, nextBatchStart + BATCH_SIZE);

        if (nextBatch.length === 0) {
            setError('No more questions available');
            return;
        }

        setCurrentBatch(nextBatch);
        setCurrentBatchNumber(prev => prev + 1);
        setCurrentQuestionIndex(0);
    };

    const resetQuiz = () => {
        setCurrentBatchNumber(1);
        setCurrentQuestionIndex(0);
        setTotalQuestionsAnswered(0);
        setCurrentBatch(questions.slice(0, BATCH_SIZE));
        setError(null);
    };

    const hasMoreQuestions = (): boolean => {
        return currentBatchNumber * BATCH_SIZE < questions.length;
    };

    return {
        questions: currentBatch,
        loading,
        error,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        submitAnswers,
        continueToNextBatch,
        totalQuestionsAnswered,
        currentBatchNumber,
        hasMoreQuestions,
        resetQuiz,
        totalQuestions: questions.length
    };
};