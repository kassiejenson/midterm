import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApi } from '../api/apiV3.js';
import { useAuth } from '../hooks/useAuth.jsx';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    if (user) {
        return (<Navigate to="/profile" />)
    }

    const usersApi = useApi('users');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Sorry, passwords do not match.');
        }

        const user = {
            email,
            password,
        };

        const newUserId = await usersApi.create(user);
        console.log('new id', newUserId);
        navigate('/');

    }

    const doesPasswordMatch = (password === confirmPassword);

    return(
        <div>
            <h1>Register for Canvas Here!</h1>
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
                        style={{
                            borderColor: doesPasswordMatch ? 'green' : 'red'
                        }}
                    />
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                            borderColor: doesPasswordMatch ? 'green' : 'red'
                        }}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;