// src/hooks/useQuestions.ts
import { useState, useEffect } from 'react';
import { Question, SubmitAnswer, SubmissionResult } from '../types/question';

interface UseQuestionsReturn {
    questions: Question[];
    loading: boolean;
    error: string | null;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: (index: number) => void;  // This is the important part
    submitAnswers: (answers: Record<number, string>) => Promise<SubmissionResult | null>;
    submissionStatus: 'idle' | 'submitting' | 'success' | 'error';
    submissionError: string | null;
}

export const useQuestions = (): UseQuestionsReturn => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch('http://localhost:3001/api/questions');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error('Invalid response format');
                }

                setQuestions(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
                console.error('Error fetching questions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const submitAnswers = async (answers: Record<number, string>): Promise<SubmissionResult | null> => {
        try {
            setSubmissionStatus('submitting');
            setSubmissionError(null);

            const formattedAnswers: SubmitAnswer[] = Object.entries(answers).map(([questionId, selectedOption]) => ({
                questionId: parseInt(questionId),
                selectedOption
            }));

            const response = await fetch('http://localhost:3001/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers: formattedAnswers })
            });

            if (!response.ok) {
                throw new Error(`Submission failed with status: ${response.status}`);
            }

            const result: SubmissionResult = await response.json();
            setSubmissionStatus('success');
            return result;

        } catch (err) {
            setSubmissionStatus('error');
            setSubmissionError(err instanceof Error ? err.message : 'Failed to submit answers');
            console.error('Error submitting answers:', err);
            return null;
        }
    };

    return {
        questions,
        loading,
        error,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        submitAnswers,
        submissionStatus,
        submissionError
    };
};
