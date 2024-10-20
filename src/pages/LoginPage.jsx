import { useState } from 'react';
import { useApi } from '../api/apiV3.js';
import { useAuth } from '../hooks/useAuth.jsx';
import { useNavigate, Navigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const usersApi = useApi('users');
    const { user, login } = useAuth();
    const navigate = useNavigate();

    console.log('user', user)

    if (user) {
        return (<Navigate to="/profile" />)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const users = await usersApi.getAll();
        const foundUser = users.find(u => u.email === email && u.password === password);

        console.log('found user', foundUser);
        if (foundUser) {
            login(foundUser);
            navigate('/');
        } else {
            alert('Invalid username or password. Please try again.');
        }
    }

    return (
        <div>
            <h1>Login to Your Account!</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;