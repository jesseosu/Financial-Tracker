import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 New
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import DashboardChart from '../components/DashboardChart';
import TransactionForm from '../components/TransactionForm';

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // 👈 New

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/transactions', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTransactions(res.data);
        } catch (err) {
            console.error('Failed to load transactions:', err);
            setError('Could not fetch transactions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // 👇 Add this
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Welcome, {user?.name || 'User'}</h2>
                <button onClick={handleLogout}>Logout</button> {/* 👈 Logout Button */}
            </div>

            <TransactionForm onTransactionAdded={fetchTransactions} />

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : transactions.length === 0 ? (
                <p>No transactions yet. Add one to get started!</p>
            ) : (
                <DashboardChart transactions={transactions} />
            )}
        </div>
    );
}
