import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white pt-16 pb-8 mt-auto z-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          {/* Kolom Brand & Social Media */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold tracking-tight block mb-4">EcoVibes.</span>
            <p className="text-gray-400 mb-6 max-w-sm font-medium">
              Membangun masa depan yang berkelanjutan melalui inovasi Munchware. Mulai langkah kecilmu hari ini.
            </p>
            <div className="flex space-x-3">
              {/* Link Instagram */}
              <a 
                href="https://www.instagram.com/munchware_ecovibes?igsh=MWJkaGs2bHM2OHE2eA%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 transition-all shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </a>
              {/* Link TikTok */}
              <a 
                href="https://www.tiktok.com/@munchware_ecovibes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 transition-all shadow-sm"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Kolom Navigasi */}
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wider text-sm text-gray-300">Navigasi</h3>
              <ul className="space-y-3 font-medium text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-transform">Beranda</a></li>
                <li><a href="#tentang" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-transform">Tentang Kami</a></li>
                <li><a href="#kemitraan" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-transform">Kemitraan</a></li>
                <li><a href="/blog" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-transform">Blog & Artikel</a></li>
              </ul>
            </div>

          {/* Kolom Kontak */}
          <div>
              <h3 className="font-bold mb-4 uppercase tracking-wider text-sm text-gray-300">Hubungi Kami</h3>
              <ul className="space-y-3 font-medium text-gray-400">
                <li className="flex items-center gap-3 hover:text-emerald-400 transition-colors cursor-pointer"><Mail className="w-5 h-5" /> hello@ecovibes.id</li>
              </ul>
          </div>
        </div>

        {/* Garis Bawah Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm font-medium text-gray-500">
          <p>© {new Date().getFullYear()} EcoVibes Team. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}