import React from 'react';
import { SubmissionResult } from '../types/question';
import './Results.css';

interface ResultsProps {
    results: SubmissionResult;
}

export const Results: React.FC<ResultsProps> = ({ results }) => {
    return (
        <div className="results-container">
            <h2>Quiz Results</h2>
            <div className="score-summary">
                <h3>Score: {results.score} out of {results.total}</h3>
                <p>Percentage: {((results.score / results.total) * 100).toFixed(1)}%</p>
            </div>

            <div className="questions-review">
                {results.results.map((result, index) => (
                    <div key={result.questionId} className={`question-result ${result.correct ? 'correct' : 'incorrect'}`}>
                        <h4>Question {index + 1}</h4>
                        <p>{result.question}</p>
                        
                        <div className="answer-comparison">
                            <div className="your-answer">
                                <strong>Your Answer:</strong>
                                <ul>
                                    {Array.isArray(result.userAnswer) 
                                        ? result.userAnswer.map((answer, i) => (
                                            <li key={i}>{answer}</li>
                                        ))
                                        : <li>{result.userAnswer}</li>
                                    }
                                </ul>
                            </div>
                            
                            <div className="correct-answer">
                                <strong>Correct Answer:</strong>
                                <ul>
                                    {Array.isArray(result.correctAnswer) 
                                        ? result.correctAnswer.map((answer, i) => (
                                            <li key={i}>{answer}</li>
                                        ))
                                        : <li>{result.correctAnswer}</li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};