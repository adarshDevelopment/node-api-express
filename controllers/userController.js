// const db = require('../models/index')
// import db from '../models/index.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {

    const { email, name, password } = req.body;

    // validate
    const schemam = {
        email: { type: 'email', optional: false },
        password: { type: 'string', optional: false, min: 8, max: 32. }
    }
    const v = new Validator();
    v.validate({ email, password }, schemam);

    // check if same account exists
    const user = models.User.findOne({ where: { email } });

    if (user) {
        return res.status(409).json({ message: 'Entered email already exists' });
    }

    try {
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // store credentials
        const newUser = await models.User.create({ name, email, password: hashedPassword });

        // sign token and send
        const token = jwt.sign({ name: newUser.name, email: newUser.email }, process.env.ACCESS_TOKEN_SECRET);
        res.status(201).json({ meessage: 'User successfully created', user: newUser, accessToken: token });

    } catch (e) {
        res.status(500).json({ message: 'Error creating User', error: e });
    }


}

export const login = async (req, res) => {

    const { email, password } = req.body;
    // validate fields
    const schema = {
        email: { type: 'email', optional: false },
        password: { type: 'string', optional: false, min: 8, max: 32 }
    };
    const v = new Validator();
    v.validate({ email, password }, schema);

    try {
        // validate credentials & and see if user exists
        const user = await models.User.findOne({ where: email });
        const passwordCheck = bcrypt.compare(password, user.password);    // returns true/false

        if (!user || !passwordCheck) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // sign token and send
        const token = jwt.sign({ email, name: user.name }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ message: 'User sucessfully singed in', user: user, accessToken: token });

    } catch (e) {
        return res.status(500).json({ message: 'Error signing in user' });
    }

}

