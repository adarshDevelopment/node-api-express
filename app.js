import express from 'express';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();


// json parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json('Hello world');
})

app.use('/posts', postRoutes);
app.use('/user', userRoutes);


export default app;