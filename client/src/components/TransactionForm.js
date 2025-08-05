import { useState } from 'react';
import axios from 'axios';

export default function TransactionForm({ onTransactionAdded }) {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post(
                '/api/transactions',
                { amount, type, category, date },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAmount('');
            setCategory('');
            setDate('');
            onTransactionAdded(); // trigger reload
            alert('Transaction added!');
        } catch (err) {
            console.error('Error adding transaction:', err.response?.data || err.message);
            alert('Failed to add transaction');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <h3>Add Transaction</h3>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit">Add</button>
        </form>
    );
}
