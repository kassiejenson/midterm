import { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState({
        name: '',
        age: '',
        isTeacher: false,
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setUserInfo({
                name: storedUser.name || '',
                age: storedUser.age || '',
                isTeacher: storedUser.isTeacher || false,
            });
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setUserInfo({
            name: userData.name || '',
            age: userData.age || '',
            isTeacher: userData.isTeacher || false,
        });
    };
    
    const logout = () => {
        setUser(null);
        setUserInfo({ name: '', age: '', isTeacher: false })
        localStorage.removeItem('user');
    }

    const isLoggedIn = () => {
        return !!user;
    }

    const updateUser = (data) => {
        const updatedUserInfo = {
            ...userInfo,
            ...data
        }
        setUserInfo(updatedUserInfo);
        localStorage.setItem('user', JSON.stringify({...user, ...data}))
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn, userInfo, updateUser }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContext;