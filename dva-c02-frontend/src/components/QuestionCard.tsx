/* 
    QuestionCard component is a functional component that takes in the following props:
    - question: Question
    - currentIndex: number
    - onAnswerSelect: (answerId: string) => void
    - selectedAnswer?: string

    The component renders the question and a list of options. The user can select an option by clicking on the radio button. The selected option is highlighted in the UI.
    The component is used in the QuizPage component to display the questions and options to the user.
*/

// src/components/QuestionCard.tsx
import React from 'react';
import { Question } from '../types/question';

interface QuestionCardProps {
    question: Question;
    currentIndex: number;
    onAnswerSelect: (answerId: string) => void;
    selectedAnswer?: string;
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
            <p>{question.question}</p>
            <div className="options">
                {question.options.map((option, index) => (
                    <div key={index} className="option">
                        <input
                            type="radio"
                            id={`option-${index}`}
                            name={`question-${question.id}`}
                            checked={selectedAnswer === option}
                            onChange={() => onAnswerSelect(option)}
                        />
                        <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};
