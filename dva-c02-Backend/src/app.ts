import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import questionRoutes from './routes/questionRoutes';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Use express.json() instead of bodyParser
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static(path.join(__dirname, '../views')));

// API Routes
app.use('/api/questions', questionRoutes);

// Main route
app.get('/', (req: Request, res: Response) => {
    try {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    } catch (error) {
        res.status(500).send('Error loading the application');
    }
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found'
    });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server
const startServer = () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Access the application at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app;
