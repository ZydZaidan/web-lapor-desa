import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './Pages/Home';
import FormLapor from './Pages/FormLapor';
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
        <Route path="/" element={<Home />} />
        <Route path="/lapor" element={<FormLapor />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}