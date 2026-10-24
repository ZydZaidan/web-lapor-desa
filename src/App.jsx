import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Admin from './Pages/Admin';

// Protected Route
const ProtectedRoute = () => {
  const isAuth = sessionStorage.getItem('isAdminLoggedIn') === 'true' || localStorage.getItem('isAdminLoggedIn') === 'true';
  
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rute yang dilindungi Satpam */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}