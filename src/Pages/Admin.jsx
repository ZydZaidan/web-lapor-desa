import { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, LogOut, Eye, Trash2, X, Image as ImageIcon, FileText as FileIcon, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import logo from "../assets/LogoGlawanWhite.svg"; 

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    // Jika tidak ada session login, tendang balik ke halaman login
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [laporanData, setLaporanData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // 1. Tarik Data dari Supabase
  const fetchLaporan = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('laporan')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error("Error fetching data:", error);
    else setLaporanData(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadLaporan = async () => {
      if (!isMounted) return;
      await fetchLaporan();
    };

    loadLaporan();

    return () => {
      isMounted = false;
    };
  }, [fetchLaporan]);

  // 2. Fungsi Hapus Data
  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau menghapus laporan ini secara permanen, Pak/Bu?")) {
      const { error } = await supabase.from('laporan').delete().eq('id', id);
      if (!error) {
        alert("Laporan berhasil dihapus!");
        fetchLaporan(); // Refresh tabel kalau sukses
      } else {
        alert("Gagal menghapus laporan: " + error.message);
      }
    }
  };

  // 3. Fungsi Ubah Status di Modal
  const handleUpdateStatus = async () => {
    const { error } = await supabase
      .from('laporan')
      .update({ status: newStatus })
      .eq('id', selectedReport.id);

    if (!error) {
      alert("Mantap, status laporan berhasil diupdate!");
      closeModal();
      fetchLaporan(); // Refresh tabel
    } else {
      alert("Waduh, gagal update status. Coba lagi nggih.");
    }
  };

  const handleViewDetail = (laporan) => {
    setSelectedReport(laporan);
    setNewStatus(laporan.status); // Set dropdown ke status saat ini
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    navigate('/login');
  };

  const getStatusStyle = (status) => {
    if (status === 'Menunggu') return 'bg-amber-100 text-amber-700';
    if (status === 'Diproses') return 'bg-gray-100 text-gray-700';
    if (status === 'Selesai') return 'bg-emerald-100 text-emerald-700';
    return 'bg-gray-100 text-gray-700';
  };

  // Hitung Statistik Otomatis
  const totalLaporan = laporanData.length;
  const totalAspirasi = laporanData.filter(item => item.kategori === 'Aspirasi').length;
  const totalPelayanan = laporanData.filter(item => item.kategori === 'Pelayanan').length;
  const totalMenunggu = laporanData.filter(item => item.status === 'Menunggu').length;

  return (
   <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans">
      
      {/* 1. HEADER KHUSUS MOBILE (Hanya Muncul di HP) */}
      <header className="md:hidden bg-desa-darker text-white p-4 flex items-center justify-between shadow-md z-30">
        <img src={logo} alt="Logo Desa Glawan" className="h-8 w-auto" />
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Menu className="w-6 h-6 text-desa-light" />
        </button>
      </header>

      {/* 2. OVERLAY GELAP DI HP (Muncul saat sidebar terbuka) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 3. SIDEBAR (Bisa slide di HP, Permanen di Desktop) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-desa-darker text-white flex flex-col shadow-xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center">
          <img src={logo} alt="Logo Desa Glawan" className="w-32 h-auto" />
          {/* Tombol Close silang (X) hanya di HP */}
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white p-1">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="px-6 py-2 text-xs text-gray-400 font-semibold tracking-wider mt-2 md:mt-0">MENU UTAMA</div>
        <nav className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-lg font-medium border-l-4 border-desa-light">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
        </nav>
        
        <button onClick={handleLogout} className="flex items-center gap-3 text-gray-400 hover:text-white px-8 py-6 font-medium transition-colors border-t border-white/10">
          <LogOut className="w-5 h-5" /> Keluar Akun
        </button>
      </aside>

      {/* 4. MAIN CONTENT */}
      {/* Tinggi disesuaikan: di HP dipotong tinggi header (64px), di Desktop full layar */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-72px)] md:h-screen relative">
        <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
          
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Sugeng Rawuh, Admin Glawan</h1>
            <p className="text-slate-500 text-sm mt-1">Pusat Kendali Wadul & Usulan Warga Desa</p>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-35">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider leading-relaxed">
                Total Laporan Masuk
              </p>
              <h3 className="text-4xl font-extrabold text-slate-800 mt-4">
                {totalLaporan}
              </h3>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-35">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider leading-relaxed">
                Aspirasi Warga
              </p>
              <h3 className="text-4xl font-extrabold text-slate-800 mt-4">
                {totalAspirasi}
              </h3>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-35">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider leading-relaxed">
                Urusan Pelayanan
              </p>
              <h3 className="text-4xl font-extrabold text-slate-800 mt-4">
                {totalPelayanan}
              </h3>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-200 bg-amber-50/50 flex flex-col justify-between min-h-35">
              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider leading-relaxed">
                Belum Ditangani
              </p>
              <h3 className="text-4xl font-extrabold text-amber-600 mt-4">
                {totalMenunggu}
              </h3>
            </div>

          </div>

          {/* TABLE SECTION */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
              <p className="text-xs text-slate-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-desa-primary animate-pulse"></span> Data sinkron otomatis dari server</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-slate-500 font-semibold text-xs border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 uppercase tracking-wider">Tanggal Masuk</th>
                    <th className="px-6 py-4 uppercase tracking-wider">Data Warga</th>
                    <th className="px-6 py-4 uppercase tracking-wider">Kategori</th>
                    <th className="px-6 py-4 uppercase tracking-wider">Topik Laporan</th>
                    <th className="px-6 py-4 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 uppercase tracking-wider text-center">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    <tr><td colSpan="6" className="text-center py-10 text-gray-500">Tunggu sebentar nggih, sedang memuat data...</td></tr>
                  ) : laporanData.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-10 text-gray-500">Belum ada wadul atau usulan dari warga saat ini.</td></tr>
                  ) : (
                    laporanData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-800">{item.nama_pelapor}</p>
                          <p className="text-xs text-slate-500">{item.rt_rw}</p>
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
                            {item.status}
                          </span>
                        </td>
                        {/* AKSI SELALU MUNCUL */}
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button title="Cek Detail" onClick={() => handleViewDetail(item)} className="p-2 bg-white border border-gray-200 hover:bg-gray-50 text-slate-600 rounded-lg shadow-sm transition-all"><Eye className="w-4 h-4" /></button>
                            <button title="Hapus Laporan" onClick={() => handleDelete(item.id)} className="p-2 bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-lg shadow-sm transition-all"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MODAL POP-UP DETAIL LAPORAN */}
        {isModalOpen && selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-lg text-slate-800">Rincian Wadul Warga</h3>
                <button onClick={closeModal} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"><X className="w-5 h-5" /></button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Kiri: Info Text */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status Penanganan</p>
                      <select 
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-desa-primary"
                      >
                        <option value="Menunggu">Belum Diproses</option>
                        <option value="Diproses">Sedang Ditindaklanjuti</option>
                        <option value="Selesai">Sampun Selesai (Ditutup)</option>
                      </select>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Data Warga (Pelapor)</p>
                      <p className="font-bold text-slate-800">{selectedReport.nama_pelapor}</p>
                      <p className="text-sm text-slate-600">{selectedReport.rt_rw}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Inti Masalah</p>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-semibold mb-2">{selectedReport.kategori}</span>
                      <h4 className="font-bold text-slate-800 text-lg mb-2">{selectedReport.judul}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                        {selectedReport.deskripsi}
                      </p>
                    </div>
                  </div>

                  {/* Kanan: Penampil PDF atau Gambar */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Lampiran Bukti Foto/Dokumen</p>
                    <div className="w-full min-h-64 bg-slate-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-2 text-center overflow-hidden">
                      {selectedReport.bukti_url ? (
                        selectedReport.bukti_url.toLowerCase().includes('.pdf') ? (
                          // Jika PDF, tampilkan tombol buka PDF
                          <div className="flex flex-col items-center space-y-3">
                            <FileIcon className="w-16 h-16 text-red-500" />
                            <p className="text-sm font-semibold text-slate-700">Warga melampirkan file PDF</p>
                            <a href={selectedReport.bukti_url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg shadow-sm transition-colors">
                              Buka & Baca Dokumen
                            </a>
                          </div>
                        ) : (
                          // Jika Gambar (JPG/PNG), tampilkan langsung gambarnya
                          <a href={selectedReport.bukti_url} target="_blank" rel="noreferrer">
                            <img src={selectedReport.bukti_url} alt="Bukti Laporan" className="w-full h-auto max-h-64 object-contain rounded-lg hover:opacity-90 transition-opacity" />
                          </a>
                        )
                      ) : (
                        // Jika tidak melampirkan file
                        <>
                          <ImageIcon className="w-12 h-12 mb-2 text-gray-300" />
                          <p className="text-sm font-medium text-gray-400">Warga tidak melampirkan bukti</p>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button onClick={closeModal} className="px-5 py-2 border border-gray-300 bg-white text-slate-700 font-medium rounded-lg hover:bg-gray-50 transition-all text-sm shadow-sm">
                  Kembali
                </button>
                <button onClick={handleUpdateStatus} className="px-5 py-2 bg-desa-primary hover:bg-desa-muted text-white font-bold rounded-lg transition-all text-sm shadow-sm">
                  Update Status Laporan
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}