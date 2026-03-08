"use client";

import Link from "next/link";
import Image from "next/image"; // <-- Tambahkan import Image di sini
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, ArrowRight, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { blogPosts } from "@/data/blogData";

export default function BlogList() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-emerald-200">

      <main className="pt-32 relative overflow-hidden">

        {/* Background Decoration */}
        <div className="absolute top-0 inset-x-0 h-125 bg-linear-to-b from-emerald-50/80 via-white to-white -z-10" />
        <div className="absolute -top-40 -right-40 w-125 h-125 bg-emerald-100/40 rounded-full blur-[100px] -z-10" />

        {/* HEADER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial="hidden" animate="show" variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeUp} className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 bg-white px-5 py-2.5 rounded-full transition-all border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
              </Link>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Jurnal <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">EcoVibes.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg lg:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Temukan berita terbaru, wawasan strategi marketing, dan cerita inspiratif di balik inovasi Munchware.
            </motion.p>
          </motion.div>
        </section>

        {/* ARTIKEL GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial="hidden" animate="show" variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogPosts.map((post) => (
              <motion.div key={post.slug} variants={fadeUp} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-100/40 hover:-translate-y-1.5 transition-all duration-500"
                >
                  
                  {/* --- COVER IMAGE DITAMBAHKAN DI SINI --- */}
                  <div className="relative w-full h-56 bg-gray-100 overflow-hidden shrink-0">
                    <Image 
                      src={post.image as any} 
                      alt={post.title} 
                      fill 
                      placeholder="blur"
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                    />
                    {/* Overlay gradien halus agar gambar terlihat lebih premium */}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  {/* -------------------------------------- */}

                  {/* CONTENT */}
                  <div className="flex flex-col grow p-6">
                    {/* Category + Tag row */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400 text-xs font-bold">
                        <Tag className="w-3 h-3" /> {post.tag}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-500 text-sm leading-relaxed grow mb-5 font-medium line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Date & CTA Row */}
                    <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                        <Calendar className="w-3.5 h-3.5" /> {post.date}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold text-sm group-hover:text-emerald-700 transition-colors">
                          Baca Artikel
                        </span>
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* NEWSLETTER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          {/* Spacer line */}
          <div className="border-t border-gray-100 mb-16" />

          <motion.div
            initial="hidden" animate="show" variants={fadeUp}
            className="bg-linear-to-br from-emerald-50 via-white to-teal-50 py-16 px-6 rounded-3xl border border-emerald-100 text-center shadow-sm"
          >
            <div className="max-w-xl mx-auto">
              {/* Icon */}
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-6 h-6 text-emerald-600" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Tetap Terhubung dengan EcoVibes
              </h3>
              <p className="text-gray-500 text-base mb-8 leading-relaxed font-medium">
                Dapatkan update terbaru tentang inovasi, tips keberlanjutan, dan cerita inspiratif langsung ke inbox Anda.
              </p>

              {/* Input + Button — stack on mobile, row on sm+ */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto mb-4">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="flex-1 px-5 py-3.5 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 text-gray-900 text-sm font-medium transition-all bg-white"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  Berlangganan <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-400 font-medium">
                Kami menghargai privasi Anda. Tidak ada spam, unsubscribe kapan saja.
              </p>
            </div>
          </motion.div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold tracking-tight block mb-4">EcoVibes.</span>
              <p className="text-gray-400 mb-6 max-w-sm font-medium text-sm leading-relaxed">
                Membangun masa depan yang berkelanjutan melalui inovasi Munchware. Mulai langkah kecilmu hari ini.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 transition-all"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 transition-all"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 transition-all"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wider text-xs text-gray-400">Navigasi</h3>
              <ul className="space-y-3 text-sm font-medium text-gray-400">
                <li><Link href="/" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Beranda</Link></li>
                <li><a href="/#tentang" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Tentang Kami</a></li>
                <li><a href="/#kemitraan" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Kemitraan</a></li>
                <li><Link href="/blog" className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all">Blog & Artikel</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 uppercase tracking-wider text-xs text-gray-400">Hubungi Kami</h3>
              <ul className="space-y-3 text-sm font-medium text-gray-400">
                <li className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 shrink-0" /> hello@ecovibes.id
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-gray-500">
            <p>© 2026 EcoVibes Team. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}