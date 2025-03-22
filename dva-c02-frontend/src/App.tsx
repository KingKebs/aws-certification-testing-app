import React, { useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { Results } from './components/Results';
import { useQuestions } from './hooks/useQuestions';
import './App.css';

function App() {
    const {
        questions,
        loading,
        error,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        submitAnswers,
        continueToNextBatch,
        totalQuestionsAnswered,
        currentBatchNumber
    } = useQuestions();

    const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
    const [currentResults, setCurrentResults] = useState<any>(null);

    const handleAnswerSelect = (answer: string | string[]) => {
        setAnswers(prev => ({
            ...prev,
            [questions[currentQuestionIndex].id]: answer
        }));
    };

    const handleSubmit = async () => {
        const results = await submitAnswers(answers);
        setCurrentResults(results);
    };

    const handleContinue = () => {
        setCurrentResults(null);
        setAnswers({});
        continueToNextBatch();
    };

    if (loading) return <div className="loading">Loading questions...</div>;
    if (error) return <div className="error">{error}</div>;

    if (currentResults) {
        return (
            <div className="app">
                <Results results={currentResults} />
                <div className="navigation">
                    <button className="continue-button" onClick={handleContinue}>
                        Continue to Next Set
                    </button>
                </div>
                <div className="progress-info">
                    <p>Total Questions Answered: {totalQuestionsAnswered}</p>
                    <p>Current Batch: {currentBatchNumber}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="progress-header">
                <h2>Batch {currentBatchNumber}</h2>
                <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
                <p>Total Questions Answered: {Object.keys(answers).length}</p>
            </div>

            <QuestionCard
                question={questions[currentQuestionIndex]}
                currentIndex={currentQuestionIndex}
                selectedAnswer={answers[questions[currentQuestionIndex].id]}
                onAnswerSelect={handleAnswerSelect}
            />

            <div className="navigation">
                <button
                    className="nav-button"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                >
                    Previous
                </button>

                {currentQuestionIndex < questions.length - 1 ? (
                    <button
                        className="nav-button"
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        className="nav-button"
                        onClick={handleSubmit}
                        disabled={Object.keys(answers).length < questions.length}
                    >
                        Submit Answers
                    </button>
                )}
            </div>

            <div className="progress-bar">
                <div 
                    className="progress-fill"
                    style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                />
            </div>
        </div>
    );
}

export default App;