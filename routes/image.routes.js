import express from 'express';
import upload from '../middleware/multerImage.middleware.js';
import multer from 'multer';

const router = express.Router();

router.post('', async (req, res) => {
    /*
        third argument next gets executed after upload.single finishes executing everything there 
        is to the function. so you define the callback function yourself and check error
    */
    await upload.single('file')(req, res, next => {
        if (next instanceof multer.MulterError) {
            return res.status(400).json({ message: next.message });
        } else if (next) {
            return res.status(500).json({ message: 'Unknown error occured' });
        }
    });

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }

        res.status(201).json({ message: 'Image successfully uploaded', file: req.file })
    } catch (e) {
        return res.status(500).json({ message: 'Error uploading image', error: e.message })
    }

});

export default router;