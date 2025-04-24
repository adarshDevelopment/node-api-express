import express from 'express';
import upload from '../middleware/multerImage.middleware.js';

const router = express.Router();

router.post('', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' })
    }

    res.status(201).json({ message: 'Image successfully uploaded', file: req.file })
});

export default router;