// src/App.tsx
import React, { useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { Navigation } from './components/Navigation';
import { SubmitButton } from './components/SubmitButton';
import { Results } from './components/Results';
import { useQuestions } from './hooks/useQuestions';
import { SubmissionResult } from './types/question';
import './App.css';

// Define interface for answers to handle both single and multiple selections
interface Answers {
    [questionId: number]: string | string[];
}

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

    // Update state type to handle both single and multiple selections
    const [answers, setAnswers] = useState<Answers>({});
    const [results, setResults] = useState<SubmissionResult | null>(null);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!questions.length) return <div>No questions available</div>;

    const currentQuestion = questions[currentQuestionIndex];

    // Updated to handle both single and multiple selections
    const handleAnswerSelect = (option: string | string[]) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: option
        }));
    };

    const handleSubmit = async () => {
        // Validate all questions are answered with correct number of selections
        const isValid = questions.every(question => {
            const answer = answers[question.id];
            if (question.isMultipleChoice) {
                // For multiple choice, check if correct number of options are selected
                return Array.isArray(answer) && answer.length === (question.requiredSelections || 2);
            }
            // For single choice, check if an answer exists
            return !!answer;
        });

        if (!isValid) {
            alert('Please ensure all questions are answered with the correct number of selections.');
            return;
        }

        const transformedAnswers = Object.fromEntries(
            Object.entries(answers).map(([key, value]) => [
                key,
                Array.isArray(value) ? value.join(',') : value
            ])
        );
        const result = await submitAnswers(transformedAnswers);
        if (result) {
            setResults(result);
        }
    };

    const handleRetry = () => {
        setAnswers({});
        setResults(null);
        setCurrentQuestionIndex(0);
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    // Show results if test is completed
    if (results) {
        return <Results results={results} onRetry={handleRetry} />;
    }

    // Calculate if current question has correct number of selections
    const isCurrentQuestionValid = () => {
        const answer = answers[currentQuestion.id];
        if (currentQuestion.isMultipleChoice) {
            return Array.isArray(answer) && 
                   answer.length === (currentQuestion.requiredSelections || 2);
        }
        return !!answer;
    };

    // Add progress tracking
    const answeredQuestions = questions.filter(q => {
        const answer = answers[q.id];
        return q.isMultipleChoice 
            ? Array.isArray(answer) && answer.length === (q.requiredSelections || 2)
            : !!answer;
    }).length;

    return (
        <div className="app">
            <h1>DVA-C02 Testing Application</h1>
            
            {/* Add progress indicator */}
            <div className="progress-indicator">
                Question {currentQuestionIndex + 1} of {questions.length}
                <div className="progress-bar">
                    <div 
                        className="progress-fill"
                        style={{ width: `${(answeredQuestions / questions.length) * 100}%` }}
                    />
                </div>
            </div>

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
                disabled={
                    Object.keys(answers).length !== questions.length || 
                    submissionStatus === 'submitting' ||
                    !questions.every(q => {
                        const answer = answers[q.id];
                        return q.isMultipleChoice 
                            ? Array.isArray(answer) && answer.length === (q.requiredSelections || 2)
                            : !!answer;
                    })
                }
            />

            {/* Add answer status indicator */}
            <div className="answer-status">
                {isCurrentQuestionValid() 
                    ? "✓ Question answered" 
                    : currentQuestion.isMultipleChoice 
                        ? `Please select ${currentQuestion.requiredSelections || 2} answers`
                        : "Please select an answer"}
            </div>
        </div>
    );
}

export default App;
