// src/App.tsx
import React, { useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { Navigation } from './components/Navigation';
import { SubmitButton } from './components/SubmitButton';
import { Results } from './components/Results';
import { useQuestions } from './hooks/useQuestions';
import { SubmissionResult } from './types/question';
import './App.css';

function App() {
    const {
        questions,
        loading,
        error,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        submitAnswers,
        submissionStatus
    } = useQuestions();

    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [results, setResults] = useState<SubmissionResult | null>(null);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!questions.length) return <div>No questions available</div>;

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelect = (option: string) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: option
        }));
    };

    const handleSubmit = async () => {
        const result = await submitAnswers(answers);
        if (result) {
            setResults(result);
        }
    };

    const handleRetry = () => {
        setAnswers({});
        setResults(null);
        setCurrentQuestionIndex(0);
    };

    // Add these navigation handlers
    const handlePrevious = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    if (results) {
        return <Results results={results} onRetry={handleRetry} />;
    }

    return (
        <div className="app">
            <h1>DVA-C02 Testing Application</h1>
            
            <QuestionCard
                question={currentQuestion}
                currentIndex={currentQuestionIndex}
                onAnswerSelect={handleAnswerSelect}
                selectedAnswer={answers[currentQuestion.id]}
            />

            <Navigation
                onPrevious={handlePrevious}
                onNext={handleNext}
                canGoPrevious={currentQuestionIndex > 0}
                canGoNext={currentQuestionIndex < questions.length - 1}
            />

            <SubmitButton
                onSubmit={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length || submissionStatus === 'submitting'}
            />
        </div>
    );
}

export default App;
