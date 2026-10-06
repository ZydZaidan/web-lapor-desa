import { useState, useRef } from "react";
import {
  FileText,
  MapPin,
  User,
  UploadCloud,
  ChevronRight,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import desa from "../assets/desa.jpeg";
import { supabase } from "../lib/supabase"; // Pastikan path ini sesuai dengan file supabase.js lu

export default function Landing() {
  const [isAnonim, setIsAnonim] = useState(false);
  const fileInputRef = useRef(null); // Buat memicu klik hidden input file

  // State untuk nampung semua isian form
  const [formData, setFormData] = useState({
    nama_pelapor: "",
    rt_rw: "",
    kategori: "",
    judul: "",
    deskripsi: "",
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fungsi buat nangkep ketikan input
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi utama ngirim data ke Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.kategori || !formData.judul || !formData.deskripsi) {
      alert("Mohon lengkapi Kategori, Judul, dan Detail Laporan!");
      return;
    }
    if (!isAnonim && (!formData.nama_pelapor || !formData.rt_rw)) {
      alert(
        "Mohon lengkapi Nama dan RT/RW, atau centang 'Kirim sebagai Anonim'.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      let bukti_url = null;

      // 1. Kalau ada file, upload ke Storage dulu
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`; // Bikin nama file unik

        const { error: uploadError } = await supabase.storage
          .from("bukti_laporan")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Ambil link publiknya
        const { data: publicUrlData } = supabase.storage
          .from("bukti_laporan")
          .getPublicUrl(fileName);

        bukti_url = publicUrlData.publicUrl;
      }

      // 2. Kirim data teks + link file ke tabel SQL
      const { error: insertError } = await supabase.from("laporan").insert([
        {
          is_anonim: isAnonim,
          nama_pelapor: isAnonim ? "Anonim" : formData.nama_pelapor,
          rt_rw: isAnonim ? "Rahasia" : formData.rt_rw,
          kategori: formData.kategori,
          judul: formData.judul,
          deskripsi: formData.deskripsi,
          bukti_url: bukti_url,
        },
      ]);

      if (insertError) throw insertError;

      alert("Laporan berhasil dikirim! Terima kasih atas partisipasi Anda.");

      // Reset form setelah sukses
      setFormData({
        nama_pelapor: "",
        rt_rw: "",
        kategori: "",
        judul: "",
        deskripsi: "",
      });
      setFile(null);
      setIsAnonim(false);
    } catch (error) {
      alert("Gagal mengirim laporan: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 bg-desa-darker overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={desa}
            alt="Background Desa"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-desa-darker/90 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Layanan Pengaduan & <br /> Aspirasi Desa
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Kanal partisipatif warga Desa Sukamaju untuk melaporkan kendala
              lingkungan, menyampaikan kritik konstruktif, serta mengawal
              transparansi pembangunan desa secara langsung, aman, dan
              terpercaya.
            </p>
            <a
              href="#form-lapor"
              className="inline-flex items-center gap-2 bg-desa-yellow hover:bg-desa-yellow-hover text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl mt-4"
            >
              <FileText className="w-5 h-5" /> Isi Formulir
            </a>
          </div>
        </div>
      </section>

      {/* 2. TENTANG DESA KAMI */}
      <section id="tentang" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src={desa}
                alt="Sawah Desa"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="w-12 h-1 bg-desa-yellow rounded-full mb-2"></div>
            <h2 className="text-3xl font-bold text-slate-800">
              Tentang Desa Kami
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Pemerintah Desa Sukamaju berkomitmen menciptakan tatanan desa yang
              bersih, responsif, dan menjunjung tinggi keterbukaan informasi.
              Setiap aspirasi Anda adalah pilar kemajuan bersama.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FORM SECTION */}
      <section id="form-lapor" className="py-20 px-4 sm:px-6 bg-gray-50 grow">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <p className="text-desa-yellow font-bold text-sm tracking-widest uppercase">
              Partisipasi Warga
            </p>
            <h2 className="text-3xl font-extrabold text-slate-800">
              Kirim Laporan Anda
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Sampaikan keluhan, aspirasi, atau usulan pembangunan desa di sini.
              Tim penanganan pengaduan desa akan memverifikasi dalam 1x24 jam.
            </p>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl shadow-desa-muted/10 border border-gray-100">
            {/* TAG FORM DITAMBAHIN ONSUBMIT */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Toggle Anonim */}
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <h4 className="font-semibold text-slate-700 text-sm">
                    Kirim sebagai Anonim
                  </h4>
                  <p className="text-xs text-slate-500">
                    Identitas Anda akan disembunyikan dari publik dan petugas.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isAnonim}
                    onChange={() => setIsAnonim(!isAnonim)}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-desa-primary"></div>
                </label>
              </div>

              {/* Grid Input Nama & RT */}
              {!isAnonim && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Nama Lengkap *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="nama_pelapor"
                        value={formData.nama_pelapor}
                        onChange={handleInputChange}
                        placeholder="e.g. Budi Santoso"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-desa-primary focus:border-desa-primary outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      RT / Wilayah Dusun *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="rt_rw"
                        value={formData.rt_rw}
                        onChange={handleInputChange}
                        placeholder="e.g. RT 03 / RW 05, Dusun Sukamantri"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-desa-primary focus:border-desa-primary outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Kategori Laporan */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Kategori Laporan *
                </label>
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-desa-primary focus:border-desa-primary outline-none transition-all text-sm text-slate-600 cursor-pointer"
                >
                  <option value="">Pilih Klasifikasi Aduan...</option>
                  <option value="Aspirasi">Aspirasi</option>
                  <option value="Pelayanan">Pelayanan</option>
                </select>
              </div>

              {/* Judul Laporan */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Judul Laporan *
                </label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  placeholder="e.g. Lampu Jalan Mati di Jalur Poros Dusun 2"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-desa-primary focus:border-desa-primary outline-none transition-all text-sm"
                />
              </div>

              {/* Detail Laporan */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Detail Laporan *
                </label>
                <textarea
                  rows="5"
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  placeholder="Jelaskan secara spesifik kronologis masalah, titik lokasi pastinya terdekat, dan dampak yang dialami warga..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-desa-primary focus:border-desa-primary outline-none transition-all text-sm resize-y"
                ></textarea>
              </div>

              {/* Upload File Area */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Unggah Bukti (Foto / Dokumen PDF)
                </label>

                {/* Input file disembunyikan */}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => setFile(e.target.files[0])}
                />

                {/* Div ini yang diklik buat nge-trigger input file di atas */}
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div className="space-y-1 text-center">
                    <UploadCloud
                      className={`mx-auto h-10 w-10 transition-transform ${file ? "text-desa-light" : "text-desa-primary group-hover:scale-110"}`}
                    />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <span className="relative font-semibold text-desa-primary hover:text-desa-light">
                        {file ? file.name : "Klik untuk memilih berkas"}
                      </span>
                    </div>
                    {!file && (
                      <p className="text-xs text-gray-500">
                        Mendukung format JPG, PNG, atau PDF (Ukuran maksimal
                        5MB)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-desa-yellow hover:bg-desa-yellow-hover text-white font-bold py-4 px-6 rounded-lg transition-all shadow-md mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Mengirim Laporan..."
                  : "Kirimkan Laporan Sekarang"}
                {!isSubmitting && <ChevronRight className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
