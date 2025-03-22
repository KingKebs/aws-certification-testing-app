/*
    This component is responsible for rendering the question card with the question, options, and the ability to select answers.
    It also handles the selection of answers and updates the selected answer state in the parent component.
    The component receives the question object, the current index, the selected answer, and the onAnswerSelect function as props.
    The onAnswerSelect function is called when an answer is selected and is used to update the selected answer state in the parent component.
    The handleChange function is called when an option is selected, and it updates the selected answer state based on the question type (single or multiple choice).
    The component renders the question, options, and checkboxes/radio buttons based on the question type.
    The selected answer is checked based on the current state and updated when an option is selected.
    The component also displays an indicator for multiple choice questions. 
*/
import React from 'react';
import { Question } from '../types/question';

interface QuestionCardProps {
    question: Question;
    currentIndex: number;
    selectedAnswer: string | string[];
    onAnswerSelect: (answer: string | string[]) => void; // Updated type
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    currentIndex,
    selectedAnswer,
    onAnswerSelect
}) => {
    const handleChange = (option: string) => {
        const isMultiple = question.isMultipleChoice ?? false;
        
        if (isMultiple) {
            // Handle multiple selections
            const currentSelections = Array.isArray(selectedAnswer) ? selectedAnswer : [];
            if (currentSelections.includes(option)) {
                // Remove the option if already selected
                onAnswerSelect(
                    currentSelections.filter(item => item !== option)
                );
            } else {
                // Add the option to selections
                onAnswerSelect([...currentSelections, option]);
            }
        } else {
            // Single selection
            onAnswerSelect(option);
        }
    };

    return (
        <div className="question-card">
            <div className="question-content">
                <div className="question-header">
                    <h2>Question {currentIndex + 1}</h2>
                    {(question.isMultipleChoice ?? false) && (
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
                                type={(question.isMultipleChoice ?? false) ? "checkbox" : "radio"}
                                name={`question-${question.id}`}
                                value={option}
                                checked={
                                    (question.isMultipleChoice ?? false)
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
        </div>
    );
};
