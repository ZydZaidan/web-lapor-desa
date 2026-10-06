import { LayoutDashboard, FileText, Settings, LogOut, Search, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar (Sembunyi di HP, muncul di layar gede) */}
      <aside className="w-64 bg-desa-darker text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-desa-dark">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-8 h-8 bg-desa-primary rounded-full flex items-center justify-center text-sm">LD</span>
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 bg-desa-primary/20 text-desa-light px-4 py-3 rounded-lg font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-desa-dark px-4 py-3 rounded-lg font-medium transition-colors">
            <FileText className="w-5 h-5" /> Semua Laporan
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-desa-dark px-4 py-3 rounded-lg font-medium transition-colors">
            <Settings className="w-5 h-5" /> Pengaturan
          </a>
        </nav>
        <div className="p-4 border-t border-desa-dark">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-gray-300 hover:text-red-400 w-full px-4 py-2 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Semua Laporan Warga</h1>
            <p className="text-slate-500 text-sm">Kelola dan pantau aspirasi dari warga Desa Sukamaju.</p>
          </div>
          <div className="w-10 h-10 bg-desa-primary rounded-full flex items-center justify-center text-white font-bold shadow-md">
            A
          </div>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Laporan Masuk</p>
              <h3 className="text-2xl font-bold text-slate-800">24</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Menunggu Diproses</p>
              <h3 className="text-2xl font-bold text-slate-800">5</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-desa-light/20 text-desa-primary rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Laporan Selesai</p>
              <h3 className="text-2xl font-bold text-slate-800">19</h3>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Cari laporan..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-desa-primary" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-gray-50 text-slate-700 uppercase font-semibold text-xs border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Pelapor</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Judul</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Dummy Row 1 */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">06 Okt 2026</td>
                  <td className="px-6 py-4 font-medium text-slate-800">Warga Anonim</td>
                  <td className="px-6 py-4"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">Infrastruktur</span></td>
                  <td className="px-6 py-4">Jalan lubang di depan balai desa</td>
                  <td className="px-6 py-4"><span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-semibold">Menunggu</span></td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 text-slate-600 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
                {/* Dummy Row 2 */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">05 Okt 2026</td>
                  <td className="px-6 py-4 font-medium text-slate-800">Budi (RT 01)</td>
                  <td className="px-6 py-4"><span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold">Pelayanan</span></td>
                  <td className="px-6 py-4">Pengurusan KTP lambat</td>
                  <td className="px-6 py-4"><span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">Selesai</span></td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 text-slate-600 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}