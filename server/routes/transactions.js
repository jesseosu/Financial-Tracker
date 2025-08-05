const express = require('express');
const jwt = require('jsonwebtoken');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Middleware to check and decode JWT
function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied');

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        console.error('JWT verification failed:', err);
        res.status(401).send('Invalid token');
    }
}

// GET all transactions for logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        res.json(transactions);
    } catch (err) {
        console.error('Failed to fetch transactions:', err);
        res.status(500).send('Failed to fetch transactions');
    }
});

// POST new transaction
router.post('/', auth, async (req, res) => {
    try {
        const { amount, type, category, date } = req.body;

        const newTransaction = new Transaction({
            userId: req.user.id,
            amount,
            type,
            category,
            date,
        });

        await newTransaction.save();
        res.status(201).json(newTransaction); // return the saved object
    } catch (err) {
        console.error('Add transaction error:', err);
        res.status(500).send('Failed to add transaction');
    }
});

module.exports = router;
