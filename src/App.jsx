import { AuthProvider } from './context/AuthProvider.jsx';
import { useAuth } from './hooks/useAuth.jsx';
import { ModulesProvider } from './context/ModulesProvider.jsx';
import { AnnouncementsProvider } from './context/AnnouncementsProvider.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import Home from './pages/HomePage.jsx';
import Login from './pages/LoginPage.jsx';
import Register from './pages/RegisterPage.jsx';
import Profile from './pages/ProfilePage.jsx';
import Announcements from './pages/Announcements.jsx';
import Pages from './pages/Pages.jsx';
import Modules from './pages/Modules.jsx';
import Layout from './components/layout/Layout.jsx';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
};



function App() {

  return (
    <AuthProvider>
      <AnnouncementsProvider>
        <ModulesProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}  />
                <Route path="/pages" element={<PrivateRoute><Pages /></PrivateRoute> } />
                <Route path="/announcements" element={<PrivateRoute><Announcements /></PrivateRoute>} />
                <Route path="/modules" element={<PrivateRoute><Modules /></PrivateRoute>} />
                <Route path="/pages/:id" element={<PrivateRoute><Pages /></PrivateRoute>} />
              </Routes>
            </Layout>
          </Router>
        </ModulesProvider>
      </AnnouncementsProvider>
    </AuthProvider>
  )
}

export default App;
