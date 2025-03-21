/* 
    Navigation component that displays two buttons: Previous and Next.
    The buttons are disabled when the canGoPrevious and canGoNext props are false, respectively.
    The onPrevious and onNext props are the functions that are called when the Previous and Next buttons are clicked.
*/

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
