import { Mail, Lock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Ini fungsi dummy, nanti kita ganti pake Supabase Auth
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header Login */}
        <div className="bg-desa-darker p-8 text-center">
          <div className="w-12 h-12 bg-desa-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">LD</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Portal Admin</h2>
          <p className="text-desa-light text-sm mt-1">LaporDesa Sukamaju</p>
        </div>

        {/* Form Login */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Akses</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="email" 
                  placeholder="admin@sukamaju.go.id" 
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-desa-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-desa-primary outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 bg-desa-yellow hover:bg-desa-yellow-hover text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md mt-4"
            >
              Masuk Dashboard
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}