// const db = require('../models/index')
import * as models from '../models/index.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import Validator from 'fastest-validator';


export const register = async (req, res) => {
    const { email, name, password } = req.body;

    // validate
    const schema = {
        email: { type: 'email', optional: false },
        password: { type: 'string', optional: false, min: 8, max: 32. }
    }
    const v = new Validator();
    const errors = v.validate({ email, password }, schema);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // check if same account exists
    const user = await models.default.User.findOne({ where: { email: email } });

    if (user) {
        return res.status(409).json({ message: 'Entered email already exists' });
    }

    try {
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // store credentials
        const newUser = await models.default.User.create({ name, email, password: hashedPassword });

        // sign token and send
        const token = jwt.sign({ name: newUser.name, email: newUser.email, id: newUser.id }, process.env.ACCESS_TOKEN_SECRET);
        res.status(201).json({ meessage: 'User successfully created', user: newUser, accessToken: token });

    } catch (e) {
        res.status(500).json({ message: 'Error creating User', error: e.message });
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
    const errors = v.validate({ email, password }, schema);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        console.log('user: ', models.default);

        // validate credentials & and see if user exists
        const user = await models.default.User.findOne({ where: { email } });
        const passwordCheck = bcrypt.compare(password, user.password);    // returns true/false

        if (!user || !passwordCheck) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // sign token and send
        const token = jwt.sign({ email, name: user.name, id: user.id }, process.env.ACCESS_TOKEN_SECRET);

        return res.status(200).json({ message: 'User sucessfully singed in', user: user, accessToken: token });

    } catch (e) {
        return res.status(500).json({ message: 'Error signing in user', error: e.message });
    }

}

