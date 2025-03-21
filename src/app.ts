import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import questionRoutes from './routes/questionRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/questions', questionRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});