// src/components/Results.tsx
import React from 'react';
import { SubmissionResult } from '../types/question';

interface ResultsProps {
    results: SubmissionResult;
    onRetry?: () => void;
}

export const Results: React.FC<ResultsProps> = ({ results, onRetry }) => {
    return (
        <div className="results">
            <h2>Quiz Results</h2>
            <div className="score-summary">
                <p>Score: {results.score} / {results.totalQuestions}</p>
                <p>Percentage: {results.percentageScore.toFixed(2)}%</p>
            </div>
            <div className="results-details">
                {results.results.map((result, index) => (
                    <div key={index} className={`result-item ${result.correct ? 'correct' : 'incorrect'}`}>
                        <span>Question {result.questionId + 1}: </span>
                        <span>{result.correct ? '✓' : '✗'}</span>
                    </div>
                ))}
            </div>
            {onRetry && (
                <button className="retry-button" onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    );
};
