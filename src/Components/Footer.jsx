
import logo from "../assets/LogoGlawanWhite.svg";
import { Mail, Phone, MapPin } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-desa-darker text-gray-300 py-12 px-6 md:px-12 border-t border-desa-dark">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="space-y-4">
          <img src={logo} alt="Logo Desa Glawan" className="w-32 h-auto" />
          <p className="text-sm max-w-md leading-relaxed text-gray-300">
            Portal resmi aduan dan aspirasi warga Desa Glawan. Bersama membangun desa yang lebih baik, cepat, dan transparan.
          </p>
        </div>

        <div className="space-y-4 md:text-left">
          <h3 className="text-white text-sm font-bold uppercase tracking-wider">Kontak <span className="text-desa-yellow">&</span> Pelayanan</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center justify-start gap-2">
              <Mail className="w-4 h-4 text-desa-yellow" />
              <span>pemdes.glawan@gmail.com</span>
            </li>
            <li className="flex items-center justify-start gap-2">
              <Phone className="w-4 h-4 text-desa-yellow" />
              <span>0851-8268-3298</span>
            </li>
            <li className="flex items-center justify-start gap-2">
              <MapPin className="w-4 h-4 text-desa-yellow" />
              <span>Desa Glawan, Kec. Pabelan, Kabupaten Semarang, Jawa Tengah</span>
            </li>
          </ul>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-desa-dark text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
        <p>© 2026 DesaGlawan - Sistem Laporan Pelayanan Warga Desa Glawan.</p>
      </div>
    </footer>
  );
}