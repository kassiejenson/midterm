import Header from './Header.jsx';
import { useState, useEffect } from 'react';
import MainNavbar from './MainNavbar.jsx';

const Layout = ({ children }) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const storedPages = JSON.parse(localStorage.getItem('pages')) || [];
        setPages(storedPages);
    }, [])

    return (
        <div className="layout">
            <Header />
            <MainNavbar pages={pages}/>
            <main>{children}</main>
        </div>
    )
}

export default Layout;