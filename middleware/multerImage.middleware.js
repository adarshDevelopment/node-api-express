import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // if (file.mimetype != 'image/jpg' || 'image/jpeg' || 'image/png') {
        //     return cb(new Error('Please upload a valid jpg'), false);
        // }
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file'), false);
    }
}

const upload = multer({ storage, fileFilter });
export default upload;
