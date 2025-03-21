import fs from 'fs';
import path from 'path';

class QuestionController {
    private questions: any[];

    constructor() {
        const questionsPath = path.join(__dirname, '../../scripts/extracted_questions.json');
        this.questions = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));
    }

    getQuestions(req: any, res: any) {
        res.json(this.questions);
    }

    checkAnswer(req: any, res: any) {
        const { questionIndex, selectedOption } = req.body;
        const correctAnswer = this.questions[questionIndex].correctAnswer;
        const isCorrect = Array.isArray(correctAnswer)
            ? correctAnswer.includes(selectedOption)
            : selectedOption === correctAnswer;
        res.json({ isCorrect });
    }
}

export default QuestionController;