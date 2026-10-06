import { useState } from 'react';
import { Mail, Lock, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
  // State untuk nyimpen inputan (persiapan buat integrasi Backend/Supabase nanti)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi loading 1 detik biar kerasa realistis
    setTimeout(() => {
      // Bikin kunci akses ke localStorage (Ini yang dibaca sama Satpam di App.jsx)
      localStorage.setItem('isAdminLoggedIn', 'true'); 
      setIsLoading(false);
      navigate('/admin'); // Tendang masuk ke dashboard
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden px-4">
      
      {/* Ornamen Background (Biar tampilannya nggak kaku/polos) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-desa-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-desa-yellow/10 rounded-full blur-3xl"></div>

      {/* Card Login Utama */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-desa-darker/5 z-10 overflow-hidden border border-gray-100">
        
        {/* Header Login (Hijau Tua Premium) */}
        <div className="bg-desa-darker p-8 text-center relative">
          <Link to="/" className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-medium">
            <ArrowLeft className="w-4 h-4" /> Beranda
          </Link>
          
          <h2 className="text-2xl font-bold text-white">Portal Admin</h2>
          <p className="text-desa-light text-sm mt-1 tracking-wide">Desa Sukamaju</p>
        </div>

        {/* Form Isi */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Email Akses</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sukamaju.ap.go.id" 
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-desa-primary focus:border-desa-primary outline-none transition-all text-sm text-slate-700"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-desa-primary focus:border-desa-primary outline-none transition-all text-sm text-slate-700"
                />
              </div>
            </div>

            {/* Tombol Submit CTA (Kuning) */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-desa-yellow hover:bg-desa-yellow-hover text-white font-bold py-3.5 px-4 rounded-lg transition-all shadow-md mt-6 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                <>
                  Masuk Dashboard
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
          </form>
        </div>
        
        {/* Footer Card */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-slate-500">
            Hanya petugas berwenang yang dapat mengakses halaman ini.
          </p>
        </div>

      </div>
    </div>
  );
}