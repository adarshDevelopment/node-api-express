import express from 'express';
import postRoutes from './routes/posts.js';

const app = express();

app.get('/', (req, res) => {
    res.json('Hello world');
})

app.use('/posts', postRoutes);

export default app;