import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <header className="header">
            <Link to="/" className="text-2xl font-bold">Canvas</Link>
        </header>
    )
}

export default Header;