import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>Welcome to Personal Finance Tracker</h2>
            <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to continue.</p>
        </div>
    );
}
