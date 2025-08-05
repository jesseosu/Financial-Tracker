/* === server/models/Transaction.js === */
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    type: { type: String, enum: ['income', 'expense'] },
    category: String,
    date: Date,
});

module.exports = mongoose.model('Transaction', TransactionSchema);
