# Here's a summary of each file's function and its relationships:

Types ( types/question.ts)

```
// Defines data structures used throughout the app
interface Question {
    id: number;
    questionText: string;
    options: string[];
    correctAnswer: number;
}
```
Provides TypeScript interfaces used across frontend

Matches backend data structure for questions

Ensures type safety between frontend and backend

Custom Hook ( hooks/useQuestions.ts)