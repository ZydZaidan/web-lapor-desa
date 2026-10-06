
export default function Footer() {
  return (
    <footer className="bg-desa-darker text-gray-300 py-12 px-6 md:px-12 border-t border-desa-dark">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="space-y-4">
          <h2 className="text-white text-2xl font-bold">LaporDesa</h2>
          <p className="text-sm max-w-md leading-relaxed">
            Pemerintah Desa Sukamaju - Portal LaporDesa. <br /><br />
            Menyediakan kemudahan akses bagi warga untuk berpartisipasi dan berkontribusi melalui saluran pelaporan dan aspirasi demi kemajuan desa yang transparan dan lebih baik.
          </p>
        </div>

        <div className="space-y-4 md:text-right">
          <h3 className="text-white text-sm font-bold uppercase tracking-wider">Kontak & Pelayanan</h3>
          <ul className="text-sm space-y-2">
            <li>Email: pengaduan@sukamaju.ap.go.id</li>
            <li>Telepon: (021) 8872-3092</li>
            <li>Alamat: Jl. Raya Desa No. 12</li>
          </ul>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-desa-dark text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
        <p>© 2026 LaporDesa - Sistem Informasi Pelayanan Warga Desa Sukamaju.</p>
        <p>Kecamatan Sukamaju - Kabupaten Asri</p>
      </div>
    </footer>
  );
}