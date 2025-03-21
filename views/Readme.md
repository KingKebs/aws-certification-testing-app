DOM Elements:

questionText: Displays the current question text.
optionsContainer: Contains the options for the current question.
submitAnswerButton: Button to submit the selected answer.
resultContainer: Displays the result of the answer check or the final score.
Variables:

selectedOption: Stores the index of the selected option.
currentQuestionIndex: Tracks the index of the current question.
correctAnswersCount: Counts the number of correct answers.
totalQuestions: Total number of questions to be answered.
Functions:

loadQuestion: Fetches questions from the server, displays the current question and its options, and sets up click event listeners for the options.
checkAnswer: Sends the selected answer to the server for validation, updates the score if the answer is correct, and either loads the next question or displays the final score.
Event Listeners:

Adds a click event listener to the submit button to trigger the checkAnswer function when clicked.
How It Works
When the page loads, the DOMContentLoaded event triggers the initialization of the application.
The loadQuestion function fetches the questions from the server and displays the first question and its options.
When an option is clicked, it is highlighted, and its index is stored in selectedOption.
When the submit button is clicked, the checkAnswer function sends the selected answer to the server for validation.
If the answer is correct, the score is updated. The application then either loads the next question or displays the final score if all questions have been answered.
This setup ensures that the user can go through a series of questions, select answers, and receive feedback on their performance at the end.