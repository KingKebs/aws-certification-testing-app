import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import questionRoutes from './routes/questionRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/questions', questionRoutes);

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, '../views')));

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../'));
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});