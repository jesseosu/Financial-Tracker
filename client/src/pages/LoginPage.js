import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        const profile = await axios.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${res.data.token}` },
        });
        setUser(profile.data);
        navigate('/dashboard');
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
            <h2>Login</h2>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            /><br />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            /><br />
            <button type="submit">Login</button>

            <p style={{ marginTop: '1rem' }}>
                Don’t have an account?{' '}
                <button type="button" onClick={goToRegister} style={{ textDecoration: 'underline', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
                    Register here
                </button>
            </p>
        </form>
    );
}
