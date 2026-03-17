"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from 'sonner';

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Mengecek apakah URL saat ini berawalan "/admin"
  const isAdmin = pathname?.startsWith("/admin");

  // Jika di halaman admin, kembalikan konten polos tanpa Navbar & Footer publik
  if (isAdmin) {
    return <>{children}</>;
  }

  // Jika di halaman publik, tampilkan Navbar dan Footer
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        {children}
      </main>
    <Toaster position="bottom-center" richColors />
    <ScrollToTop />
      <Footer />
    </>
  );
}