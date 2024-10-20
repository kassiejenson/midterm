import Button from '../components/common/Button.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user } = useAuth();

    return (
        <>
        <h1>Welcome to Class!</h1>
        <h3>Please login or register to continue</h3>
        <div>
            <Link to="/login">
                <Button>Login</Button>
            </Link>
            <Link to="/register">
                <Button>Register</Button>
            </Link>
        </div>
        </>
    )
}

export default Home;