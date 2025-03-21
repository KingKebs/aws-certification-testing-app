/* 
    SubmitButton component
    This component is used to render the submit button in the app.
    It takes two props:
    1. onSubmit: a function that is called when the button is clicked.
    2. disabled: a boolean value that determines whether the button is disabled or not.
    The button is disabled when the
*/
import React from 'react';

interface SubmitButtonProps {
    onSubmit: () => void;
    disabled: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit, disabled }) => {
    return (
        <button 
            className="submit-button"
            onClick={onSubmit}
            disabled={disabled}
        >
            Submit Answers
        </button>
    );
};
