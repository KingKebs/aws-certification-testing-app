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
