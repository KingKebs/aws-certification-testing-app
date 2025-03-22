declare global {
    interface Window {
        nextQuestion: () => void;
        previousQuestion: () => void;
    }
}

interface Question {
    id: number;
    questionText: string;
    options: string[];
    correctAnswer: number;
}

let questions: Question[] = [];
let currentQuestionIndex = 0;

async function fetchQuestions() {
    try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        questions = await response.json();
        console.log('Questions loaded:', questions); // Debug log
        displayCurrentQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

function displayCurrentQuestion() {
    const question = questions[currentQuestionIndex];
    if (!question) {
        console.error('No question found at index:', currentQuestionIndex);
        return;
    }

    const questionContainer = document.getElementById('question-container');
    if (!questionContainer) {
        console.error('Question container not found');
        return;
    }

    const questionHtml = `
        <div class="question">
            <h3>Question ${currentQuestionIndex + 1}</h3>
            <p>${question.questionText}</p>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option">
                        <input type="radio" 
                               id="option${index}" 
                               name="question${currentQuestionIndex}" 
                               value="${index}">
                        <label for="option${index}">${option}</label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    questionContainer.innerHTML = questionHtml;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayCurrentQuestion();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayCurrentQuestion();
    }
}

// Make sure these functions are available globally
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, fetching questions...'); // Debug log
    fetchQuestions();
});

// Export functions for global use
export { nextQuestion, previousQuestion };
