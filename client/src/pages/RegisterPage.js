import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/auth/register', {
                name,
                email,
                password,
            });

            alert('Registration successful. You can now log in.');
            navigate('/login');
        } catch (err) {
            console.error('❌ Registration error:', err.response?.data || err.message);
            alert(`Error: ${err.response?.data || 'Registration failed'}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
            <h2>Register</h2>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            /><br />
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
            <button type="submit">Register</button>

            <p style={{ marginTop: '1rem' }}>
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={() => navigate('/login')}
                    style={{
                        textDecoration: 'underline',
                        background: 'none',
                        border: 'none',
                        color: 'blue',
                        cursor: 'pointer',
                    }}
                >
                    Back to Login
                </button>
            </p>
        </form>
    );

}
