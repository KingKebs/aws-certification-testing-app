import React from 'react';
import { SubmissionResult } from '../types/question';

interface ResultsProps {
    results: SubmissionResult;
}

export const Results: React.FC<ResultsProps> = ({ results }) => {
    return (
        <div className="results">
            <h2>Results</h2>
            <div className="score-summary">
                <p>Score: {results.score} out of {results.totalQuestions}</p>
                <p>Percentage: {results.percentageScore !== undefined ? results.percentageScore.toFixed(2) : 'N/A'}%</p>
                <p className={results.passingScore ? "passing" : "failing"}>
                    {results.passingScore ? "PASS" : "FAIL"}
                </p>
            </div>

            <div className="results-details">
                {results.results.map((result) => (
                    <div 
                        key={result.questionId} 
                        className={`result-item ${result.correct ? 'correct' : 'incorrect'}`}
                    >
                        <p><strong>Question:</strong> {result.question}</p>
                        <p><strong>Your Answer:</strong> {Array.isArray(result.userAnswer) ? 
                            result.userAnswer.join(', ') : result.userAnswer}</p>
                        <p><strong>Correct Answer:</strong> {Array.isArray(result.correctAnswer) ? 
                            result.correctAnswer.join(', ') : result.correctAnswer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};