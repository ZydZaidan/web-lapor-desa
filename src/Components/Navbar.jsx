import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/LogoGlawan.svg"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-desa-darker py-4 px-6 md:px-12 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <div className="font-bold text-xl tracking-wide flex items-center gap-2">
          <img src={logo} alt="Logo Desa Glawan" className="w-32 h-auto" />
          {/* <span className="text-desa-yellow">Desa<span className="text-white">Glawan</span></span> */}
          
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="/" className="hover:text-desa-light transition-colors">Beranda</a>
          <a href="/#tentang" className="hover:text-desa-light transition-colors">Tentang Kami</a>
          <a href="/lapor" className="hover:text-desa-light transition-colors">Buat Laporan</a>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center text-desa-darker hover:text-desa-yellow transition-colors"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t-2 border-desa-yellow flex flex-col py-4 shadow-xl">
          <a 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="px-6 py-3 hover:bg-white/5 transition-colors font-medium"
          >
            Beranda
          </a>
          <a 
            href="/#tentang" 
            onClick={() => setIsOpen(false)}
            className="px-6 py-3 hover:bg-white/5 transition-colors font-medium"
          >
            Tentang Kami
          </a>
          <a 
            href="/lapor" 
            onClick={() => setIsOpen(false)}
            className="px-6 py-3 hover:bg-white/5 transition-colors font-medium"
          >
            Buat Laporan
          </a>
        </div>
      )}
    </nav>
  );
}