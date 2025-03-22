// src/hooks/useQuestions.ts
import { useState, useEffect } from 'react';
import { Question } from '../types/question';

interface UseQuestionsReturn {
    questions: Question[];
    loading: boolean;
    error: string | null;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: (index: number) => void;
    submitAnswers: (answers: Record<number, string | string[]>) => Promise<any>;
    continueToNextBatch: () => void;
    questionsCompleted: number;
    totalQuestionsAnswered: number;
    currentBatchNumber: number;
}

export const useQuestions = (): UseQuestionsReturn => {
    const [allQuestions, setAllQuestions] = useState<Question[]>([]);
    const [currentBatch, setCurrentBatch] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentBatchNumber, setCurrentBatchNumber] = useState(1);
    const [questionsCompleted, setQuestionsCompleted] = useState(0);
    const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);

    const BATCH_SIZE = 65;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/questions');
                const data = await response.json();
                setAllQuestions(data);
                // Get first batch of questions
                const firstBatch = data.slice(0, BATCH_SIZE);
                setCurrentBatch(firstBatch);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load questions');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const continueToNextBatch = () => {
        const nextBatchStart = currentBatchNumber * BATCH_SIZE;
        const nextBatch = allQuestions.slice(nextBatchStart, nextBatchStart + BATCH_SIZE);
        
        if (nextBatch.length > 0) {
            setCurrentBatch(nextBatch);
            setCurrentBatchNumber(prev => prev + 1);
            setCurrentQuestionIndex(0);
            setQuestionsCompleted(0);
        } else {
            setError('No more questions available');
        }
    };

    const submitAnswers = async (answers: Record<number, string | string[]>) => {
        try {
            // Calculate results for current batch
            const results = currentBatch.map(question => {
                const userAnswer = answers[question.id];
                // You'll need to implement the correct answer checking logic
                return {
                    questionId: question.id,
                    question: question.question,
                    userAnswer,
                    // Add correct answer checking here
                };
            });

            setTotalQuestionsAnswered(prev => prev + BATCH_SIZE);

            return {
                batchNumber: currentBatchNumber,
                questionsAnswered: BATCH_SIZE,
                totalAnswered: totalQuestionsAnswered + BATCH_SIZE,
                results
            };

        } catch (err) {
            throw new Error('Failed to process answers');
        }
    };

    return {
        questions: currentBatch,
        loading,
        error,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        submitAnswers,
        continueToNextBatch,
        questionsCompleted,
        totalQuestionsAnswered,
        currentBatchNumber
    };
};
