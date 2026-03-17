"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { 
  ArrowLeft, Calendar, Tag, User, Share2, 
  Twitter, Linkedin, Facebook, Link2, Quote
} from "lucide-react";
import { notFound } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const post = useQuery(api.articles.getBySlug, { slug: resolvedParams.slug });

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (post === undefined) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
         <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
         <p className="text-gray-500 font-bold animate-pulse">Menyiapkan artikel untuk Anda...</p>
      </div>
    );
  }

  if (post === null) return notFound();

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    if (!currentUrl) return;
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("Link berhasil disalin!", {
        description: "Bagikan artikel ini ke teman-temanmu.",
      });
    } catch {
      toast.error("Gagal menyalin link.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 selection:bg-emerald-200">
      <main className="grow pt-32 pb-24">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER ARTIKEL */}
          <header className="max-w-3xl mx-auto text-center mb-16">
            <div className="mb-10">
              <Link href="/blog" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-emerald-600 bg-gray-50 hover:bg-emerald-50 px-6 py-3 rounded-full shadow-sm border border-gray-100 transition-all hover:-translate-y-1">
                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Jurnal
              </Link>
            </div>

            <div className="flex justify-center mb-6">
              <span className="bg-emerald-50 text-emerald-700 px-5 py-2 rounded-xl text-sm font-black tracking-widest uppercase border border-emerald-100 shadow-sm">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-[1.15] tracking-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-gray-500 mb-16">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                <User className="w-4 h-4 text-emerald-500" /> {post.author}
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                <Calendar className="w-4 h-4 text-emerald-500" /> {post.date}
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                <Tag className="w-4 h-4 text-emerald-500" /> #{post.tag}
              </div>
            </div>
          </header>

          {/* KONTEN ARTIKEL */}
          <div className="max-w-3xl mx-auto">
            <div className="mb-20">
              {post.content.map((block: any, index: number) => {
                
                // RENDER BLOK PARAGRAF (DARI REACT QUILL)
                if (block.type === "paragraph") {
                  // Membersihkan bug &nbsp; dari editor agar teks bisa turun ke baris baru
                  const cleanHTML = (block.text || "").replace(/&nbsp;/g, " ");

                  return (
                    <div 
                      key={index} 
                      className="rich-text-container text-lg text-gray-700 leading-relaxed mb-6 tracking-wide wrap-break-word"
                      dangerouslySetInnerHTML={{ __html: cleanHTML }}
                    />
                  );
                }
                
                // RENDER BLOK HEADING (SUB-JUDUL)
                if (block.type === "heading") {
                  return (
                    <h3 key={index} className="text-3xl font-black text-gray-900 mt-14 mb-6 tracking-tight">
                      {block.text}
                    </h3>
                  );
                }

                // RENDER BLOK QUOTE (KUTIPAN)
                if (block.type === "quote") {
                  return (
                    <div key={index} className="relative my-12">
                      <blockquote className="relative p-8 md:p-10 bg-emerald-50/80 rounded-4xl border border-emerald-100 shadow-sm">
                        <div className="absolute top-0 left-8 -translate-y-1/2 bg-emerald-500 text-white p-3.5 rounded-2xl shadow-lg">
                          <Quote className="w-6 h-6" />
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-emerald-900 italic leading-relaxed mt-2">
                          "{block.text}"
                        </p>
                      </blockquote>
                    </div>
                  );
                }

                // RENDER BLOK GAMBAR (DI TENGAH ARTIKEL)
                if (block.type === "image" && block.imageSrc) {
                  return (
                    <div key={index} className="relative w-full aspect-video my-14 rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-100">
                      <img 
                        src={block.imageSrc} 
                        alt="Ilustrasi Artikel" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                    </div>
                  );
                }
                
                return null;
              })}
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-200 mb-12" />

            {/* SHARE BOX */}
            <div className="bg-white rounded-4xl border border-gray-200 shadow-lg p-6 sm:p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Bagikan Wawasan Ini</h4>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Bantu kami sebarkan pesan keberlanjutan.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 hover:-translate-y-1 transition-all"><Twitter className="w-5 h-5" /></a>
                  <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-700 hover:border-blue-400 hover:bg-blue-50 hover:-translate-y-1 transition-all"><Linkedin className="w-5 h-5" /></a>
                  <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 hover:-translate-y-1 transition-all"><Facebook className="w-5 h-5" /></a>
                  <button onClick={handleCopyLink} className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 hover:-translate-y-1 transition-all"><Link2 className="w-5 h-5" /></button>
                </div>
              </div>
            </div>

            {/* AUTHOR BOX */}
            <div className="bg-linear-to-br from-gray-50 to-white rounded-4xl p-8 sm:p-10 border border-gray-100 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="w-20 h-20 rounded-full bg-emerald-600 shrink-0 flex items-center justify-center text-white font-black text-2xl shadow-lg border-4 border-emerald-100">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="text-emerald-600 font-bold text-xs tracking-widest uppercase mb-1">Ditulis Oleh</div>
                  <h4 className="font-black text-gray-900 text-xl mb-3">{post.author}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    Tim di balik layar EcoVibes. Kami berdedikasi untuk membagikan wawasan mendalam mengenai strategi pemasaran hijau dan bagaimana inovasi kecil seperti Munchware dapat memberikan dampak masif bagi bumi.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </article>
      </main>
    </div>
  );
}