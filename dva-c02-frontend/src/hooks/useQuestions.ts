/* 
    This hook is used to fetch questions from the API. 
    It uses the `fetch` API to make a GET request to the `/api/questions` endpoint. 
    The hook returns an object with three properties: 
    - `questions` is an array of Question objects, 
    - `loading` is a boolean that indicates whether the request is still pending, 
    - `error` is a string that contains an error message if the request fails.
*/

import { useState, useEffect } from 'react';
import { Question } from '../types/question';

export const useQuestions = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/questions');
                if (!response.ok) throw new Error('Failed to fetch questions');
                const data = await response.json();
                setQuestions(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    return { questions, loading, error };
};
