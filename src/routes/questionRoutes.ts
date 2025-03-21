import { Router } from 'express';
import QuestionController from '../controllers/questionController';

const router = Router();
const questionController = new QuestionController();

export function setRoutes(app) {
    app.use('/api/questions', router);
    router.get('/', questionController.getQuestions.bind(questionController));
    router.post('/check-answer', questionController.checkAnswer.bind(questionController));
}