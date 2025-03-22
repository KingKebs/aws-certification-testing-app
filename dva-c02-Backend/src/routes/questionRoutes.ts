// dva-c02-Backend/src/routes/questionRoutes.ts
import { Router } from 'express';
import QuestionController from '../controllers/questionController';

const router = Router();
const questionController = new QuestionController();

// Update the routes to handle correct answers
router.get('/', (req, res) => questionController.getQuestions(req, res));
router.post('/check', (req, res) => questionController.checkAnswer(req, res));
router.post('/submit', questionController.submitAnswers.bind(questionController));
// Add a new route to get questions with answers (for admin/testing)
router.get('/with-answers', (req, res) => questionController.getQuestionsWithAnswers(req, res));

export default router;