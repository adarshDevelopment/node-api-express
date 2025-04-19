import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {

    // validate jwt
    try {
        // extracting token
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){    // checking for bearer keyword
            return res.status(401).json({message: 'No Bearer token provided'}); 
        }
        const token = authHeader.split(' ')[1];

        // verify token with secret key
        // will throw exception if invalid
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = payload; // loading decrypted user object 
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token', error: e.message })
    }
}

export default auth;