import React from 'react';

interface NavigationProps {
    onPrevious: () => void;
    onNext: () => void;
    canGoPrevious: boolean;
    canGoNext: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
    onPrevious,
    onNext,
    canGoPrevious,
    canGoNext
}) => {
    return (
        <div className="navigation">
            <button 
                onClick={onPrevious} 
                disabled={!canGoPrevious}
                className="nav-button"
            >
                Previous
            </button>
            <button 
                onClick={onNext} 
                disabled={!canGoNext}
                className="nav-button"
            >
                Next
            </button>
        </div>
    );
};
