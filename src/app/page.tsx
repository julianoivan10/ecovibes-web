"use client";
import { motion, Variants } from "framer-motion";
import { Utensils, Leaf, TrendingUp, ArrowRight, Instagram, Twitter, Linkedin, Mail, CheckCircle2 } from "lucide-react";

import Image from "next/image";

import ecoVibesImg from "../assets/images/EcoVibes.jpeg";

export default function Home() {
  // Animasi dasar untuk elemen yang muncul dari bawah
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Animasi berantai untuk grup elemen (seperti kartu)
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-50 rounded-full blur-[100px] -z-10 transform translate-x-1/2 -translate-y-1/4" />

        <motion.div 
          className="flex-1 text-center lg:text-left z-10"
          initial="hidden" animate="show" variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
            <Leaf className="w-4 h-4" /> <span>Revolusi Alat Makan Masa Depan</span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.15]">
            Bite into <br className="hidden lg:block"/>
            <span className="text-emerald-600">innovation.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-2xl font-bold text-gray-700 mb-6">
            Leave zero footprint.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Partner with us to manufacture and sell edible cutlery! Kurangi sampah plastik dan tingkatkan nilai bisnis Anda dengan Munchware.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group">
              Mulai Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-emerald-700 font-semibold border-2 border-emerald-100 hover:bg-emerald-50 hover:-translate-y-1 transition-all duration-300">
              Request Demo
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex-1 relative w-full max-w-md lg:max-w-full mx-auto"
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-4/3 lg:aspect-square group">
            <Image 
              src={ecoVibesImg} 
              alt="EcoVibes Munchware" 
              fill
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover transform group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-linear-to-tr from-black/20 to-transparent pointer-events-none"></div>
          </div>

          <motion.div 
            animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 lg:bottom-10 lg:-left-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 hover:shadow-2xl transition-shadow cursor-default"
          >
            <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="pr-2">
              <p className="text-xl font-bold text-gray-900">100%</p>
              <p className="text-sm font-medium text-gray-500">Bisa Dimakan</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- BAGIAN TENTANG / FITUR --- */}
      <section id="tentang" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Solusi Lezat untuk Bumi</h2>
            <p className="text-lg text-gray-600">Mengatasi ketidaktahuan akan dampak plastik dengan alternatif yang aman dan bisa dimakan tanpa merusak rasa.</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          >
            {[
              { icon: <Utensils/>, title: "100% Edible", desc: "Selesai makan? Makan juga sendoknya! Didesain agar tidak mengubah rasa makanan Anda." },
              { icon: <Leaf/>, title: "Zero Waste", desc: "Sepenuhnya ramah lingkungan dan terurai secara alami dalam hitungan hari jika tidak dimakan." },
              { icon: <TrendingUp/>, title: "Tingkatkan Penjualan", desc: "Tarik perhatian Gen Z dan komunitas eco-friendly ke cafe atau restoran Anda dengan inovasi unik." },
            ].map((item, i) => (
              <motion.div 
                key={i} variants={fadeUp}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-emerald-100 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- BAGIAN KEMITRAAN --- */}
      <section id="kemitraan" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Membership Structure</h2>
            <p className="text-lg text-gray-600">Save more, by reducing plastic waste. Pilih paket kemitraan yang sesuai dengan bisnis Anda.</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center"
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          >
            {/* Starter */}
            <motion.div variants={fadeUp} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-emerald-600 font-bold text-4xl">5%</span>
                <span className="text-gray-500 font-medium">Saved</span>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-6 pb-6 border-b border-gray-200">&lt; 500 unit/month</p>
              <ul className="space-y-4 mb-8 text-gray-600 min-h-35">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Save 5% per unit</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Customer service support</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Digital promo materials</li>
              </ul>
              <button className="w-full bg-white border border-gray-200 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-100 hover:text-emerald-700 transition-colors">Start now</button>
            </motion.div>

            {/* Growth */}
            <motion.div variants={fadeUp} className="bg-emerald-600 text-white p-8 lg:p-10 rounded-3xl shadow-xl relative transform md:-translate-y-4 hover:-translate-y-6 hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-6 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-b-lg uppercase">Populer</div>
              <h3 className="text-2xl font-bold mb-2">Growth</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-bold text-5xl">7.5%</span>
                <span className="text-emerald-100 font-medium">Saved</span>
              </div>
              <p className="text-sm text-emerald-100 font-medium mb-6 pb-6 border-b border-emerald-500">500 - 2.000 unit/month</p>
              <ul className="space-y-4 mb-8 text-emerald-50 min-h-35">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" /> Save 7.5% per unit</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" /> Customer service support</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" /> Digital promo materials</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" /> Priority restocking</li>
              </ul>
              <button className="w-full bg-white text-emerald-700 py-3 rounded-xl font-bold hover:bg-emerald-50 hover:shadow-md transition-all">Start now</button>
            </motion.div>

            {/* Premium */}
            <motion.div variants={fadeUp} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-emerald-600 font-bold text-4xl">10%</span>
                <span className="text-gray-500 font-medium">Saved</span>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-6 pb-6 border-b border-gray-200">&gt; 2.000 unit/month</p>
              <ul className="space-y-4 mb-8 text-gray-600 min-h-35">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Save 10% per unit</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Sales dashboard</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Priority restocking</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Co-branding</li>
              </ul>
              <button className="w-full bg-white border border-gray-200 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-100 hover:text-emerald-700 transition-colors">Start now</button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="py-20 bg-emerald-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-emerald-100/50 rounded-full blur-[80px] -z-10" />
        <div className="max-w-4xl mx-auto px-4 text-center z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Siap untuk <span className="text-emerald-600">Zero Footprint?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Bergabunglah dengan ratusan kafe dan restoran lainnya yang sudah beralih ke Munchware. Tingkatkan kepuasan pelanggan dan jaga bumi kita.
            </p>
            <button className="px-10 py-4 rounded-full bg-emerald-600 text-white font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 hover:scale-105 transition-all duration-300">
              Mulai Kemitraan Sekarang
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}