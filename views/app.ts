document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const submitAnswerButton = document.getElementById('submit-answer');
    const resultContainer = document.getElementById('result-container');

    // Initialize variables
    let selectedOption = null;
    let currentQuestionIndex = 0;
    let correctAnswersCount = 0;
    const totalQuestions = 65; // Adjust this as needed

    // Function to load a question
    const loadQuestion = async () => {
        // Fetch questions from the server
        const response = await fetch('/api/questions');
        const questions = await response.json();
        const question = questions[currentQuestionIndex];

        // Display the question text
        if (questionText) {
            questionText.textContent = question.questionText;
        }

        // Display the options
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option;
                optionElement.addEventListener('click', () => {
                    selectedOption = index;
                    document.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
                    optionElement.classList.add('selected');
                });
                optionsContainer.appendChild(optionElement);
            });
        }
    };

    // Function to check the selected answer
    const checkAnswer = async () => {
        if (selectedOption === null) {
            if (resultContainer) {
                resultContainer.textContent = 'Please select an option.';
            }
            return;
        }

        // Send the selected answer to the server for validation
        const response = await fetch('/api/questions/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionIndex: currentQuestionIndex,
                selectedOption
            })
        });

        const result = await response.json();
        if (result.isCorrect) {
            correctAnswersCount++;
        }

        // Move to the next question or display the final result
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            loadQuestion();
        } else {
            if (resultContainer) {
                resultContainer.textContent = `You answered ${correctAnswersCount} out of ${totalQuestions} questions correctly.`;
            }
        }
    };

    // Add event listener to the submit button
    if (submitAnswerButton) {
        submitAnswerButton.addEventListener('click', checkAnswer);
    }

    // Load the first question
    loadQuestion();
});