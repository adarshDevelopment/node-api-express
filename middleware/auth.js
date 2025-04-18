import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {

    // validate jwt
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({message: 'No Bearer token provided'});
        }
        const token = authHeader.split(' ')[1];

        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = payload;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token', error: e.message })
    }
}