/* 
    This component is responsible for rendering a single question card.
    It takes the following props:
    - question: An object containing the question text and options.
    - currentIndex: The index of the current question.
    - onAnswerSelect: A function that is called when an answer is selected.
    - selectedAnswer: The index of the selected answer.
*/

import React from 'react';
import { Question } from '../types/question';

interface QuestionCardProps {
    question: Question;
    currentIndex: number;
    onAnswerSelect: (answerId: number) => void;
    selectedAnswer?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    currentIndex,
    onAnswerSelect,
    selectedAnswer
}) => {
    return (
        <div className="question-card">
            <h3>Question {currentIndex + 1}</h3>
            <p>{question.questionText}</p>
            <div className="options">
                {question.options.map((option, index) => (
                    <div key={index} className="option">
                        <input
                            type="radio"
                            id={`option-${index}`}
                            name={`question-${question.id}`}
                            checked={selectedAnswer === index}
                            onChange={() => onAnswerSelect(index)}
                        />
                        <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};
