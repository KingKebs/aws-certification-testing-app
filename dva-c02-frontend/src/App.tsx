/*
  * App.tsx
  * Description: Main application
*/
import React, { useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { Navigation } from './components/Navigation';
import { SubmitButton } from './components/SubmitButton';
import { useQuestions } from './hooks/useQuestions';
import { Answer } from './types/question';
import './App.css';

function App() {
    const { questions, loading, error } = useQuestions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!questions.length) return <div>No questions available</div>;

    const currentQuestion = questions[currentIndex];

    const handleAnswerSelect = (answerId: number) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: answerId
        }));
    };

    const handleSubmit = () => {
        const results = questions.map(q => ({
            questionId: q.id,
            correct: answers[q.id] === q.correctAnswer
        }));
        console.log('Results:', results);
        // Handle submission logic
    };

    return (
        <div className="app">
            <h1>DVA-C02 Testing Application</h1>
            
            <QuestionCard
                question={currentQuestion}
                currentIndex={currentIndex}
                onAnswerSelect={handleAnswerSelect}
                selectedAnswer={answers[currentQuestion.id]}
            />

            <Navigation
                onPrevious={() => setCurrentIndex(prev => prev - 1)}
                onNext={() => setCurrentIndex(prev => prev + 1)}
                canGoPrevious={currentIndex > 0}
                canGoNext={currentIndex < questions.length - 1}
            />

            <SubmitButton
                onSubmit={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
            />
        </div>
    );
}

export default App;
