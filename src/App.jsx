import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Admin from './Pages/Admin';

// Komponen Satpam (Protected Route)
const ProtectedRoute = () => {
  // Cek apakah ada kunci 'isAdminLoggedIn' di penyimpanan browser (dummy auth)
  const isAuth = localStorage.getItem('isAdminLoggedIn');
  
  // Kalau ada, silakan lewat (Outlet). Kalau nggak, tendang ke login (Navigate)
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