import express from 'express';
import postRoutes from './routes/posts.routes.js';
import userRoutes from './routes/useres.routes.js';
import imageRoutes from './routes/image.routes.js'

const app = express();


// json parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json('Hello world');
})

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/image', imageRoutes);


export default app;