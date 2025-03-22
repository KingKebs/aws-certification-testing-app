/* 
    QuestionCard component is a functional component that takes in the following props:
    - question: Question
    - currentIndex: number
    - onAnswerSelect: (answerId: string) => void
    - selectedAnswer?: string

    The component renders the question and a list of options. The user can select an option by clicking on the radio button. The selected option is highlighted in the UI.
    The component is used in the QuizPage component to display the questions and options to the user.
*/
import React from 'react';
import { Question } from '../types/question';

interface QuestionCardProps {
    question: Question;
    currentIndex: number;
    selectedAnswer: string | string[]; // Update to handle multiple selections
    onAnswerSelect: (answer: string | string[]) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    currentIndex,
    selectedAnswer,
    onAnswerSelect,
}) => {
    const handleChange = (option: string) => {
        if (question.isMultipleChoice) {
            // Handle multiple selections
            const currentSelections = Array.isArray(selectedAnswer) ? selectedAnswer : [];
            if (currentSelections.includes(option)) {
                // Remove if already selected
                onAnswerSelect(currentSelections.filter(item => item !== option));
            } else {
                // Add new selection
                onAnswerSelect([...currentSelections, option]);
            }
        } else {
            // Single selection
            onAnswerSelect(option);
        }
    };

    return (
        <div className="question-card">
            <div className="question-header">
                <h2>Question {currentIndex + 1}</h2>
                {question.isMultipleChoice && (
                    <span className="multiple-choice-indicator">
                        (Select multiple answers)
                    </span>
                )}
            </div>
            <p className="question-text">{question.question}</p>
            <div className="options">
                {question.options.map((option, index) => (
                    <label key={index} className="option">
                        <input
                            type={question.isMultipleChoice ? "checkbox" : "radio"}
                            name={`question-${question.id}`}
                            value={option}
                            checked={
                                question.isMultipleChoice
                                    ? Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
                                    : selectedAnswer === option
                            }
                            onChange={() => handleChange(option)}
                        />
                        <span className="option-text">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
