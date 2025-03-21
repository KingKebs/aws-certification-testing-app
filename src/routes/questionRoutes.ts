import { Router } from 'express';
import QuestionController from '../controllers/questionController';

const router = Router();
const questionController = new QuestionController();

router.get('/', (req, res) => questionController.getQuestions(req, res));
router.post('/check', (req, res) => questionController.checkAnswer(req, res));

export default router;