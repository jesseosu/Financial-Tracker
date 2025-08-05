const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// ==============================
// REGISTER
// ==============================
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('Register request:', req.body);

        if (!name || !email || !password) {
            console.log('Missing field(s)');
            return res.status(400).send('Name, email, and password are required.');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('⚠Email already in use:', email);
            return res.status(409).send('User with this email already exists.');
        }

        const hash = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hash });
        await user.save();

        console.log('Registered:', email);
        res.status(201).send('User registered successfully.');
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).send(err.message || 'Internal server error');
    }
});

// ==============================
// LOGIN
// ==============================
router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt with:', req.body);

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log('No user found with email:', email);
            return res.status(400).send('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Incorrect password for:', email);
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log('Login successful for:', email);
        res.json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send(err.message || 'Login failed');
    }
});

// ==============================
// ME (PROFILE LOOKUP)
// ==============================
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).send('Access denied');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).send('User not found');

        res.json({ id: user._id, name: user.name, email: user.email });
    } catch (err) {
        console.error('Auth check failed:', err);
        res.status(401).send('Invalid token');
    }
});

module.exports = router;
