// src/app/not-found.tsx
import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
        <Leaf className="w-10 h-10 text-emerald-600" />
      </div>
      <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tight">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Waduh, Halaman Tidak Ditemukan!</h2>
      <p className="text-gray-500 font-medium max-w-md mx-auto mb-8">
        Artikel atau halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau Anda salah memasukkan URL.
      </p>
      <Link 
        href="/" 
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
      </Link>
    </div>
  );
}