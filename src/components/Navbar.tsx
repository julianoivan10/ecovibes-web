"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Eco<span className="text-emerald-600">Vibes.</span>
            </span>
          </Link>
          
        <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors">Beranda</Link>
            {/* Tambahkan garis miring sebelum # */}
            <Link href="/#tentang" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors">Tentang</Link>
            <Link href="/#kemitraan" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors">Kemitraan</Link>
            <Link href="/blog" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors">Blog</Link>
          </div>

          <div className="hidden md:block">
            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-md">
              Get Started
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 focus:outline-none cursor-pointer">
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.1 : 1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 pt-2 pb-6 space-y-2 shadow-lg absolute top-full left-0 w-full"
          >
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">Beranda</Link>
            <Link href="/#tentang" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">Tentang</Link>
            <Link href="/#kemitraan" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">Kemitraan</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">Blog</Link>
            <div className="pt-4 px-2">
              <button className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-full text-sm font-bold shadow-md hover:bg-emerald-600 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}