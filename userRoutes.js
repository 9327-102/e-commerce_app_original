const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret123';

const createToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: '7d'
    });
};

const serializeUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email
});

// Register
router.post('/register', async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashed });
    await user.save();

    const token = createToken(user);
    res.status(201).json({ user: serializeUser(user), token });
});

// Login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('User not found');

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).send('Invalid password');

    const token = createToken(user);
    res.json({ user: serializeUser(user), token });
});

module.exports = router;