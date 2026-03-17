// src/app/admin/AdminLayoutClient.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Settings, LogOut, Leaf } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden selection:bg-emerald-200">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white shadow-2xl z-20 hidden md:flex md:flex-col">
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-2 group">
            <Leaf className="w-6 h-6 text-emerald-500 group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold tracking-tight">Eco<span className="text-emerald-500">CMS</span></span>
          </Link>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Menu Utama</p>
          
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              pathname === "/admin" ? "bg-emerald-600 text-white shadow-md" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <FileText className="w-5 h-5" /> Artikel Blog
          </Link>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-all opacity-50 cursor-not-allowed text-left">
            <LayoutDashboard className="w-5 h-5" /> Produk (Segera)
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-all opacity-50 cursor-not-allowed text-left">
            <Settings className="w-5 h-5" /> Pengaturan
          </button>
        </nav>

        {/* Profile / Logout Bawah */}
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={() => signOut({ redirectUrl: '/admin' })}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all text-left"
          >
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header Khusus Admin */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <h2 className="text-xl font-bold text-gray-800">Manajemen Konten</h2>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              {/* Menampilkan Nama Asli */}
              <p className="text-sm font-bold text-gray-900">
                {!isLoaded ? "Memuat..." : user?.fullName || "Admin EcoVibes"}
              </p>
              {/* Menampilkan Email Asli */}
              <p className="text-xs text-gray-500">
                {!isLoaded ? "..." : user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
            
            {/* Menampilkan Foto Profil */}
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-black overflow-hidden border-2 border-white shadow-sm">
              {isLoaded && user?.imageUrl ? (
                <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                "A"
              )}
            </div>
          </div>
        </header>

        {/* Area Scroll Halaman (Halaman admin/page.tsx akan masuk ke sini) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}