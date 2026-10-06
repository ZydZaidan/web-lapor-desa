
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-desa-darker text-white py-4 px-6 md:px-12 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl tracking-wide flex items-center gap-2">
          LaporDesa SukaMaju
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#" className="hover:text-desa-light transition-colors">Beranda</a>
          <a href="#tentang" className="hover:text-desa-light transition-colors">Tentang Kami</a>
          <a href="#form-lapor" className="hover:text-desa-light transition-colors">Buat Laporan</a>
        </div>

      </div>
    </nav>
  );
}