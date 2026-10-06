import { useState } from 'react';
import { LayoutDashboard, LogOut, Search, Eye, Trash2, X, Image as ImageIcon} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// DUMMY DATA: Biar tabelnya hidup dan modalnya bisa nampilin data beda-beda
const dummyLaporan = [
  { id: 1, tanggal: "24 Okt 2026, 09:15 WIB", pelapor: "Budi Santoso", rt: "RT 01 / RW 03", inisial: "BS", kategori: "Pelayanan", judul: "Lampu Penerangan Jalan Umum...", deskripsi: "Sudah 4 hari lampu PJU padam di jalan poros utama. Sangat membahayakan pengendara saat malam hari karena jalanan berlubang.", status: "Menunggu" },
  { id: 2, tanggal: "24 Okt 2026, 08:30 WIB", pelapor: "Siti Aminah", rt: "RT 03 / RW 01", inisial: "SA", kategori: "Pelayanan", judul: "Permohonan Surat Keterangan...", deskripsi: "Keperluan registrasi izin edar olahan pangan UMKM tingkat desa. Mohon segera diproses pak kades.", status: "Diproses" },
  { id: 3, tanggal: "23 Okt 2026, 17:45 WIB", pelapor: "Anonim", rt: "Terverifikasi NIK", inisial: "🔒", kategori: "Aspirasi", judul: "Tumpukan Sampah Liar di Dekat...", deskripsi: "Aroma mulai mengganggu jalan santai warga di pagi hari. Mohon disediakan tempat pembuangan sampah sementara (TPS) yang layak.", status: "Menunggu" },
  { id: 4, tanggal: "23 Okt 2026, 14:10 WIB", pelapor: "Wahyudi Pratama", rt: "RT 04 / RW 02", inisial: "WP", kategori: "Pelayanan", judul: "Saluran Irigasi Sawah Tersumbat...", deskripsi: "Aliran air tersendat ke 12 petak sawah di blok barat karena ada longsoran lumpur dari pengerjaan proyek kemarin.", status: "Selesai" },
];

export default function Admin() {
  const navigate = useNavigate();
  
  // State untuk ngatur Pop-up (Modal)
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi buka/tutup modal
  const handleViewDetail = (laporan) => {
    setSelectedReport(laporan);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  // Fungsi Logout murni
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn'); // Cabut kunci akses
    navigate('/login'); // Tendang ke halaman login
  };

  // Helper untuk warna badge status
  const getStatusStyle = (status) => {
    if (status === 'Menunggu') return 'bg-amber-100 text-amber-700';
    if (status === 'Diproses') return 'bg-gray-100 text-gray-700';
    if (status === 'Selesai') return 'bg-emerald-100 text-emerald-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      
      {/* SIDEBAR (Warna Hijau Tua Gelap) */}
      <aside className="w-64 bg-desa-darker text-white hidden md:flex flex-col shadow-xl z-10">
        <div className="p-6">
          <h2 className="text-xl font-bold flex items-center gap-3">
     
            LaporDesa
          </h2>
          <p className="text-xs text-desa-light mt-1 tracking-widest uppercase">Desa Sukamaju</p>
        </div>
        
        <div className="px-6 py-2 text-xs text-gray-400 font-semibold tracking-wider">MENU UTAMA</div>
        
        <nav className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-lg font-medium border-l-4 border-desa-light">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
        </nav>
        
        <div className="p-4 bg-black/20 m-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 bg-desa-primary rounded-full flex items-center justify-center font-bold text-sm">AS</div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Admin Sukamaju</p>
            <p className="text-xs text-gray-300">Petugas Pelayanan</p>
          </div>
        </div>
        
        <button onClick={handleLogout} className="flex items-center gap-3 text-gray-400 hover:text-white px-8 py-6 font-medium transition-colors border-t border-white/10">
          <LogOut className="w-5 h-5" /> Keluar Sesi
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto h-screen relative">
        <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
          
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Selamat Datang, Admin Sukamaju</h1>
            <p className="text-slate-500 text-sm mt-1">Sistem Informasi & Pengaduan Warga Desa</p>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Total Laporan</p>
              <h3 className="text-4xl font-extrabold text-slate-800 mb-2">348</h3>
            
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Aspirasi Masuk</p>
              <h3 className="text-4xl font-extrabold text-slate-800 mb-2">192</h3>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Pelayanan Desa</p>
              <h3 className="text-4xl font-extrabold text-slate-800 mb-2">156</h3>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-200 bg-amber-50/50">
              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider mb-2">Menunggu Tindakan</p>
              <h3 className="text-4xl font-extrabold text-amber-600 mb-2">24</h3>
              <p className="text-xs text-amber-800 font-medium border border-amber-200 bg-amber-200 inline-block px-2 py-1 rounded-md text-center w-full shadow-sm">• Perlu Respon Segera</p>
            </div>
          </div>

          {/* FILTER & SEARCH */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Cari judul laporan, NIK, atau nama pelapor..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-desa-primary shadow-sm" />
            </div>
            <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm p-1 gap-1 text-sm font-medium w-full md:w-auto">
              <button className="px-4 py-1.5 bg-gray-100 text-slate-800 rounded-md shadow-sm">Semua</button>
              <button className="px-4 py-1.5 text-slate-500 hover:bg-gray-50 rounded-md">Aspirasi</button>
              <button className="px-4 py-1.5 text-slate-500 hover:bg-gray-50 rounded-md">Pelayanan</button>
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
          
              <p className="text-xs text-slate-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-desa-primary animate-pulse"></span> Sinkronisasi Realtime: Desa Sukamaju</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-slate-500 font-semibold text-xs border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 uppercase tracking-wider">Tanggal & Waktu</th>
                    <th className="px-6 py-4 uppercase tracking-wider">Pelapor</th>
                    <th className="px-6 py-4 uppercase tracking-wider">Kategori</th>
                    <th className="px-6 py-4 uppercase tracking-wider">Judul Laporan</th>
                    <th className="px-6 py-4 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 uppercase tracking-wider text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dummyLaporan.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        {item.tanggal.split(',')[0]} <br/> <span className="text-xs text-slate-400">{item.tanggal.split(',')[1]}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm ${item.pelapor === 'Anonim' ? 'bg-slate-700' : 'bg-desa-darker'}`}>
                            {item.inisial}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{item.pelapor}</p>
                            <p className="text-xs text-slate-500">{item.rt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-md text-xs font-semibold ${item.kategori === 'Aspirasi' ? 'bg-teal-50 text-teal-700 border border-teal-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                          {item.kategori}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="font-bold text-slate-800 truncate">{item.judul}</p>
                        <p className="text-xs text-slate-500 truncate">{item.deskripsi}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex w-max items-center gap-1.5 ${getStatusStyle(item.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Menunggu' ? 'bg-amber-500' : item.status === 'Selesai' ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* TOMBOL MATA UNTUK BUKA MODAL */}
                          <button onClick={() => handleViewDetail(item)} className="p-2 bg-white border border-gray-200 hover:bg-gray-50 text-slate-600 rounded-lg shadow-sm transition-all"><Eye className="w-4 h-4" /></button>
                          <button className="p-2 bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-lg shadow-sm transition-all"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-sm text-slate-500">
              <div></div>
              <div className="flex gap-1">
                <button className="px-3 py-1 hover:bg-gray-200 rounded-md transition-colors">&lt;</button>
                <button className="px-3 py-1 bg-desa-darker text-white rounded-md shadow-sm">1</button>
                <button className="px-3 py-1 hover:bg-gray-200 rounded-md transition-colors">2</button>
                <button className="px-3 py-1 hover:bg-gray-200 rounded-md transition-colors">3</button>
                <span className="px-2 py-1">...</span>
                <button className="px-3 py-1 hover:bg-gray-200 rounded-md transition-colors">58</button>
                <button className="px-3 py-1 hover:bg-gray-200 rounded-md transition-colors"> &gt;</button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* MODAL POP-UP DETAIL LAPORAN */}
        {/* ========================================= */}
        {isModalOpen && selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            
            {/* Modal Box */}
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-lg text-slate-800">Detail Pengaduan</h3>
                <button onClick={closeModal} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Kiri: Info Text */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status Laporan</p>
                      {/* Select Dropdown untuk Ubah Status */}
                      <select 
                        defaultValue={selectedReport.status}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-desa-primary"
                      >
                        <option value="Menunggu">Menunggu Tindakan</option>
                        <option value="Diproses">Sedang Diproses</option>
                        <option value="Selesai">Selesai / Ditutup</option>
                      </select>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Informasi Pelapor</p>
                      <p className="font-bold text-slate-800">{selectedReport.pelapor}</p>
                      <p className="text-sm text-slate-600">{selectedReport.rt}</p>
                      <p className="text-xs text-slate-400 mt-1">{selectedReport.tanggal}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Detail Masalah</p>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-semibold mb-2">{selectedReport.kategori}</span>
                      <h4 className="font-bold text-slate-800 text-lg mb-2">{selectedReport.judul}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                        {selectedReport.deskripsi}
                      </p>
                    </div>
                  </div>

                  {/* Kanan: Lampiran Foto/Dokumen */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Lampiran Bukti</p>
                    <div className="w-full h-64 bg-slate-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 group hover:bg-slate-50 transition-colors">
                      <ImageIcon className="w-12 h-12 mb-2 opacity-50 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-medium">Foto_Laporan_Terkait.jpg</p>
                      <p className="text-xs mt-1">(Mockup: Foto akan muncul di sini)</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button onClick={closeModal} className="px-5 py-2 border border-gray-300 bg-white text-slate-700 font-medium rounded-lg hover:bg-gray-50 transition-all text-sm shadow-sm">
                  Tutup
                </button>
                <button className="px-5 py-2 bg-desa-primary hover:bg-desa-muted text-white font-bold rounded-lg transition-all text-sm shadow-sm">
                  Simpan Perubahan
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}