import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FileText,
  MapPin,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import desa1 from "../assets/desa1.png";
import desa2 from "../assets/desa2.png"
import desa3 from "../assets/desa3.png"
import desa4 from "../assets/desa4.jpeg"
import desa5 from "../assets/desa5.png"
import edu from "../assets/edu.png"

export default function Home() {
  const location = useLocation();

  const [currentImage, setCurrentImage] = useState(0);

  // Daftar 5 Gambar 
  const heroImages = [
    desa1,
    desa2,
    desa3,
    desa5,
    desa4,
  ];

  // Logika rotasi gambar setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Logika auto-scroll menu Navbar
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* HERO SECTION DENGAN SLIDER */}
      <section className="relative h-[85vh] min-h-137.5 bg-desa-darker flex flex-col mb-16 ">
        {/* Background Slider */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentImage === index ? "opacity-30" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide Desa ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

      {/* Gradien dari bawah ke atas agar teks kiri bawah bisa terbaca */}
        <div className="absolute inset-0 bg-linear-to-t from-desa-darker/90 via-desa-darker/30 to-transparent"></div>

        {/* BUNGKUS BARU: Menyesuaikan margin & max-width persis seperti Navbar */}
        <div className="absolute bottom-28 md:bottom-32 left-0 right-0 z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            {/* Konten Hero */}
            <div className="max-w-sm md:max-w-2xl flex flex-col items-start text-left space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Layanan Pengaduan <br className="hidden md:block" /> & Aspirasi{" "}
                <span className="text-desa-yellow">Glawan</span>
              </h1>
              <p className="text-gray-200 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
                Cukup ketik wadul atau aspirasi panjenengan di sini. Laporan
                diproses cepat dan dikawal tuntas oleh perangkat Desa Glawan.
              </p>
              <Link
                to="/lapor"
                className="inline-flex items-center justify-center gap-2 bg-desa-yellow hover:bg-desa-yellow-hover text-white font-bold py-2.5 px-5 md:py-3 md:px-6 rounded-lg transition-all shadow-lg text-sm md:text-base"
              >
                <FileText className="w-4 h-4 md:w-5 md:h-5" /> Buat Laporan
              </Link>
            </div>
            
          </div>
        </div>

       <div className="absolute bottom-0 translate-y-1/2 left-4 right-4 md:left-12 md:right-12 z-20 max-w-6xl mx-auto space-y-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100 flex flex-row items-center justify-between gap-1 md:gap-2 overflow-hidden">
            
            {/* Info 1: Penduduk */}
            <div className="flex flex-col items-center text-center flex-1">
              <p className="font-bold text-slate-800 text-[11px] sm:text-sm md:text-2xl leading-tight">
                1.800+
              </p>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider mt-0.5 md:mt-1">
                Penduduk
              </p>
            </div>

            {/* Divider */}
            <div className="w-px h-8 md:h-12 bg-gray-200 shrink-0"></div>

            {/* Info 2: Luas Wilayah */}
            <div className="flex flex-col items-center text-center flex-1">
              <p className="font-bold text-slate-800 text-[11px] sm:text-sm md:text-2xl leading-tight">
                2.00 km²
              </p>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider mt-0.5 md:mt-1">
                Luas Wilayah
              </p>
            </div>

            {/* Divider */}
            <div className="w-px h-8 md:h-12 bg-gray-200 shrink-0"></div>

            {/* Info 3: Alamat Kecamatan & Tombol Maps Digabung */}
            <div className="flex flex-row items-center justify-center gap-2 md:gap-6 flex-1">
              <div className="flex flex-col items-end md:items-center text-right md:text-center">
                <p className="font-bold text-slate-800 text-[11px] sm:text-sm md:text-2xl leading-tight">
                  Kec. Pabelan
                </p>
                <p className="text-[8px] sm:text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider mt-0.5 md:mt-1">
                  Kab. Semarang
                </p>
              </div>
              
              {/* Tombol Maps Presisi */}
              <a
                href="https://maps.app.goo.gl/j7dbhmjGB7vuiu6R7"
                target="_blank"
                rel="noreferrer"
                title="Buka di Google Maps"
                className="flex items-center justify-center bg-desa-primary hover:bg-desa-muted text-white p-1.5 md:p-3 rounded-[99px] md:rounded-[99px] transition-all shadow-sm shrink-0"
              >
                <MapPin className="w-3 h-3 md:w-4 md:h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* TENTANG DESA KAMI (Tambahan pt-12 biar tidak tertutup card yang melayang) */}
      <section
        id="tentang"
        className="pt-16 pb-20 md:pt-24 px-6 md:px-12 bg-white grow z-10"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="w-12 h-1 bg-desa-yellow rounded-full"></div>
              <h2 className="text-3xl font-bold text-slate-800">
                Mengenal Desa Glawan
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Desa Glawan yang terletak di Kecamatan Pabelan, Kabupaten Semarang, Jawa Tengah, merupakan kawasan seluas 2,00 km² yang kaya akan potensi sumber daya lokal. Penggerak ekonomi utama masyarakat bertumpu pada pemberdayaan UMKM, khususnya produksi kerajinan anyaman bambu seperti besek dan keranjang ikan yang turut membuka peluang besar bagi pengembangan eduwisata desa.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Selain tangguh secara ekonomi, masyarakat Desa Glawan konsisten merawat kearifan lokal melalui tradisi Merti Dusun. Perayaan wujud syukur atas limpahan rezeki dan hasil bumi ini menjadi fondasi kuat dalam mempererat tali silaturahmi, menjaga kerukunan, serta merawat semangat gotong royong warga. Perpaduan harmonis antara kreativitas usaha lokal dan pelestarian budaya inilah yang terus mendorong Desa Glawan menuju kesejahteraan masyarakat yang berkelanjutan.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={desa1}
                  alt="Desa Glawan"
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* HIGHLIGHT POTENSI & TRADISI DESA (Pengganti 4 Card Ikon) */}
          <div className="flex flex-col space-y-8 pt-8">
            
            {/* Highlight 1: Eduwisata Desa (Gambar Kiri) */}
            <div className="group flex flex-col md:flex-row bg-gray-50 border border-gray-100 rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all gap-6 md:gap-8 items-center">
              {/* Box Gambar */}
              <div className="w-full md:w-5/12 h-56 md:h-72 rounded-2xl overflow-hidden shrink-0 relative">

                <img 
                  src={edu}
                  alt="Eduwisata Desa Glawan" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Teks Konten */}
              <div className="w-full md:w-7/12 space-y-3 px-2 md:px-0">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                  Pengembangan <span className="text-desa-primary">Eduwisata</span>
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Desa Glawan terus berinovasi memaksimalkan potensi wilayahnya dengan mengembangkan daya tarik wisata edukasi (Eduwisata). Melalui pemanfaatan sumber daya alam lokal dan pemberdayaan masyarakat, desa ini menawarkan pengalaman wisata edukatif yang interaktif sekaligus membuka peluang pertumbuhan ekonomi kreatif secara berkelanjutan.
                </p>
              </div>
            </div>

            {/* Highlight 2: Tradisi Merti Dusun (Gambar Kiri) */}
            <div className="group flex flex-col md:flex-row bg-gray-50 border border-gray-100 rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all gap-6 md:gap-8 items-center">
              {/* Box Gambar */}
              <div className="w-full md:w-5/12 h-56 md:h-72 rounded-2xl overflow-hidden shrink-0 relative">

                <img 
                  src={desa5} 
                  alt="Tradisi Merti Dusun Glawan" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Teks Konten */}
              <div className="w-full md:w-7/12 space-y-3 px-2 md:px-0">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                  Pelestarian Tradisi <span className="text-desa-yellow">Merti Dusun</span>
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Sebagai wujud syukur atas limpahan hasil bumi, kesehatan, dan keselamatan, warga rutin menggelar tradisi Merti Dusun. Kearifan lokal yang diwariskan turun-temurun ini menjadi pilar utama dalam merawat kerukunan, mempererat tali silaturahmi, serta menghidupkan semangat gotong royong di tengah kehidupan bermasyarakat.
                </p>
              </div>
            </div>

          </div>
          
        </div>
      </section>

      <Footer />
    </div>
  );
}
