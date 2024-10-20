import { NavLink, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useEffect, useState } from 'react';

const MainNavbar = ({ pages }) => {
    const { userInfo } = useAuth();
    


    return(
        <div className="mainbar">
            <nav>
                <ul>
                    {pages.map(page => (
                        <li key={page.id}>
                            <Link to={`/pages/${page.id}`}>{page.title}</Link>
                        </li>
                    ))}
                    <li>
                        <Link to="/announcements">Announcements</Link>
                    </li>
                    <li>
                        <Link to="/modules">Modules</Link>
                    </li>
                    {userInfo.isTeacher && (
                        <li>
                            <Link to="/pages">Pages</Link>
                        </li>
                    )}
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default MainNavbar;