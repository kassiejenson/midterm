import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/apiV3.js';
import { useAuth } from '../hooks/useAuth.jsx';

const Profile = () => {
    const { userInfo, updateUser, logout } = useAuth();
    const [name, setName] = useState(userInfo.name || '');
    const [age, setAge] = useState(userInfo.age || '');
    const [isTeacher, setIsTeacher] = useState(userInfo.isTeacher || false);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setAge(userInfo.age);
            setIsTeacher(userInfo.isTeacher);
        }
    }, [userInfo]);

    const handleSave = (e) => {
        e.preventDefault();

        updateUser({
            name,
            age,
            isTeacher
        });

        alert('Profile has been updated!');
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div>
            <h1>Profile</h1>
            <h2>{name}</h2>
            <form onSubmit={handleSave}>
                <div className="input-field">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Age:</label>
                    <input
                        type="text"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <label>Check if you are a teacher</label>
                    <input
                        type="checkbox"
                        checked={isTeacher}
                        onChange={(e) => setIsTeacher(e.target.checked)}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;