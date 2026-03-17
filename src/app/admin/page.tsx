"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { 
  Plus, Edit2, Trash2, ArrowLeft, ImageIcon, 
  Type, Heading1, Quote, X, ChevronUp, ChevronDown
} from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import { toast } from "sonner";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type ContentBlock = {
  type: string;
  text?: string;
  imageSrc?: string;
};

export default function AdminDashboard() {
  const articles = useQuery(api.articles.getAll);
  const createArticle = useMutation(api.articles.create);
  const updateArticle = useMutation(api.articles.update);
  const deleteArticle = useMutation(api.articles.remove);
  
  // API Storage Convex
  const generateUploadUrl = useMutation(api.articles.generateUploadUrl);
  const getImageUrl = useMutation(api.articles.getImageUrl);

  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<Id<"articles"> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
  });

  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    { type: "paragraph", text: "" }
  ]);

  // FUNGSI MENGELOLA BLOK
  const addBlock = (type: string) => setContentBlocks([...contentBlocks, { type, text: "", imageSrc: "" }]);
  const removeBlock = (index: number) => setContentBlocks(contentBlocks.filter((_, i) => i !== index));
  const updateBlockText = (index: number, text: string) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index].text = text;
    setContentBlocks(newBlocks);
  };

  // FUNGSI UPLOAD GAMBAR KHUSUS UNTUK BLOK DI TENGAH ARTIKEL
  const handleBlockImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadToast = toast.loading("Mengunggah gambar...");
    try {
      // 1. Minta URL upload ke Convex
      const postUrl = await generateUploadUrl();
      // 2. Upload file
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();
      // 3. Dapatkan URL Publik
      const url = await getImageUrl({ storageId });

      if (url) {
        const newBlocks = [...contentBlocks];
        newBlocks[index].imageSrc = url;
        setContentBlocks(newBlocks);
        toast.success("Gambar berhasil disematkan!", { id: uploadToast });
      }
    } catch (error) {
      toast.error("Gagal mengunggah gambar.", { id: uploadToast });
      console.error(error);
    }
  };

  // FUNGSI MENGGESER BLOK KE ATAS/BAWAH
  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...contentBlocks];
    const temp = newBlocks[index - 1];
    newBlocks[index - 1] = newBlocks[index];
    newBlocks[index] = temp;
    setContentBlocks(newBlocks);
  };

  const moveBlockDown = (index: number) => {
    if (index === contentBlocks.length - 1) return;
    const newBlocks = [...contentBlocks];
    const temp = newBlocks[index + 1];
    newBlocks[index + 1] = newBlocks[index];
    newBlocks[index] = temp;
    setContentBlocks(newBlocks);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ title: "", slug: "", category: "", excerpt: "" });
    setContentBlocks([{ type: "paragraph", text: "" }]);
    setSelectedFile(null);
    setPreviewImage("");
    setView("form");
  };

  const handleEdit = (article: any) => {
    setEditingId(article._id);
    setFormData({
      title: article.title,
      slug: article.slug,
      category: article.category,
      excerpt: article.excerpt,
    });
    setContentBlocks(article.content && article.content.length > 0 ? article.content : [{ type: "paragraph", text: "" }]);
    setPreviewImage(article.image);
    setSelectedFile(null);
    setView("form");
  };

  const handleDelete = async (id: Id<"articles">) => {
    if (window.confirm("Yakin ingin menghapus artikel ini secara permanen?")) {
      await deleteArticle({ id });
      toast.success("Artikel berhasil dihapus.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi sederhana: minimal ada 1 blok selain cover
    if (contentBlocks.length === 0) {
      toast.error("Konten artikel tidak boleh kosong!");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Sedang menyimpan artikel...");

    try {
      let finalImageUrl = previewImage;

      // Handle Cover Image Upload
      if (selectedFile) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": selectedFile.type },
          body: selectedFile,
        });
        const { storageId } = await result.json();
        const url = await getImageUrl({ storageId });
        if (url) finalImageUrl = url;
      }

      if (!finalImageUrl) finalImageUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800";

      if (editingId) {
        await updateArticle({
          id: editingId,
          title: formData.title,
          slug: formData.slug.toLowerCase().replace(/ /g, "-"),
          category: formData.category,
          excerpt: formData.excerpt,
          image: finalImageUrl,
          content: contentBlocks,
        });
        toast.success("Artikel berhasil diperbarui!", { id: loadingToast });
      } else {
        await createArticle({
          title: formData.title,
          slug: formData.slug.toLowerCase().replace(/ /g, "-"), 
          date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
          tag: "Terbaru",
          category: formData.category,
          author: "Tim Marketing EcoVibes",
          excerpt: formData.excerpt,
          image: finalImageUrl,
          content: contentBlocks,
        });
        toast.success("Artikel baru berhasil dipublikasikan!", { id: loadingToast });
      }

      setView("list");
    } catch (error) {
      toast.error("Gagal menyimpan artikel.", { id: loadingToast });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ==============================
  // TAMPILAN MODE DAFTAR (LIST)
  // ==============================
  if (view === "list") {
    return (
      <div className="max-w-6xl mx-auto pb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Artikel Blog</h1>
            <p className="text-gray-500 font-medium mt-1">Kelola semua tulisan jurnal EcoVibes di sini.</p>
          </div>
          <button onClick={handleAddNew} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" /> Tulis Artikel Baru
          </button>
        </div>

        {articles === undefined ? (
          <div className="text-center py-20 text-gray-400 font-bold animate-pulse">Memuat Database...</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 text-gray-400 font-bold">Belum ada artikel publikasi.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <div key={article._id} className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                    <img src={article.image} alt="cover" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase">{article.category}</span>
                    <h3 className="font-bold text-gray-900 mt-2 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">{article.title}</h3>
                    <p className="text-xs text-gray-400 mt-2">{article.date}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-50 flex items-center justify-end gap-2">
                  <button onClick={() => handleEdit(article)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Edit">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(article._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors" title="Hapus">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ==============================
  // TAMPILAN MODE EDITOR (FORM)
  // ==============================
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button onClick={() => setView("list")} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold mb-6 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Kembali ke Daftar
      </button>

      <form onSubmit={handleSubmit}>
        {/* DATA UTAMA ARTIKEL (JUDUL, COVER, DLL) */}
        <div className="bg-white p-8 sm:p-10 rounded-4xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8 pb-4 border-b border-gray-100">
            {editingId ? "Edit Konfigurasi Artikel" : "Konfigurasi Artikel Baru"}
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image (Gambar Utama)</label>
              <div 
                className={`relative w-full aspect-21/9 rounded-3xl border-2 border-dashed ${previewImage ? 'border-transparent' : 'border-gray-300 hover:border-emerald-400'} bg-gray-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer group transition-colors`}
                onClick={() => imageInput.current?.click()}
              >
                {previewImage ? (
                  <>
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <p className="text-white font-bold flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm"><ImageIcon className="w-5 h-5"/> Ganti Gambar</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-400 group-hover:text-emerald-500 transition-colors">
                    <ImageIcon className="w-10 h-10 mx-auto mb-2" />
                    <p className="font-medium text-sm">Klik untuk upload cover artikel</p>
                  </div>
                )}
                <input type="file" accept="image/*" ref={imageInput} onChange={handleFileChange} className="hidden" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Artikel</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 outline-none transition-all font-medium text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Slug URL</label>
                <input type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 outline-none transition-all font-medium text-gray-900" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Kategori</label>
              <input type="text" required placeholder="Edukasi / Strategi" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 outline-none transition-all font-medium text-gray-900" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Ringkasan (Excerpt)</label>
              <textarea required rows={2} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 outline-none transition-all font-medium text-gray-900 resize-none" />
            </div>
          </div>
        </div>

        {/* AREA RICH TEXT EDITOR / BLOCK BUILDER */}
        <div className="bg-white p-8 sm:p-10 rounded-4xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Tulis Konten</h2>
          <p className="text-gray-500 mb-8 text-sm">Tambahkan, geser, atau ubah blok untuk menyusun artikel Anda.</p>
          
          <div className="space-y-6 mb-10">
            {contentBlocks.map((block, index) => (
              <div key={index} className={`flex gap-3 group relative bg-white border hover:shadow-lg rounded-2xl transition-all duration-300 ${block.type === 'image' ? 'border-purple-200 hover:border-purple-400' : 'border-gray-200 hover:border-emerald-300'}`}>
                
                {/* AREA KONTEN UTAMA */}
                <div className="flex-1 overflow-hidden rounded-2xl flex flex-col">
                  
                  <div className={`px-5 py-2.5 border-b text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${block.type === 'image' ? 'bg-purple-50 border-purple-100 text-purple-500' : 'bg-gray-50/50 border-gray-100 text-gray-400'}`}>
                    {block.type === "heading" && <Heading1 className="w-3.5 h-3.5 text-blue-500" />}
                    {block.type === "paragraph" && <Type className="w-3.5 h-3.5 text-gray-500" />}
                    {block.type === "quote" && <Quote className="w-3.5 h-3.5 text-emerald-500" />}
                    {block.type === "image" && <ImageIcon className="w-3.5 h-3.5 text-purple-500" />}
                    {block.type}
                  </div>
                  
                  {block.type === "heading" ? (
                    <input 
                      type="text" placeholder="Tulis Sub-judul di sini..." value={block.text} onChange={(e) => updateBlockText(index, e.target.value)}
                      className="w-full px-5 py-4 bg-transparent outline-none font-black text-2xl text-gray-900"
                    />
                  ) : block.type === "paragraph" ? (
                    <ReactQuill 
                      theme="snow"
                      value={block.text || ""}
                      onChange={(content: string) => updateBlockText(index, content)}
                      placeholder="Mulai mengetik paragraf..."
                    />
                  ) : block.type === "quote" ? (
                    <textarea 
                      placeholder="Kutipan inspiratif..." value={block.text} onChange={(e) => updateBlockText(index, e.target.value)}
                      rows={2}
                      className="w-full px-5 py-4 bg-transparent outline-none resize-none leading-relaxed italic font-bold text-emerald-800 text-lg"
                    />
                  ) : block.type === "image" ? (
                    <div className="p-4">
                      {block.imageSrc ? (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden group/img">
                          <img src={block.imageSrc} alt="Konten visual" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all">
                            <label className="cursor-pointer text-white font-bold flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                              <ImageIcon className="w-5 h-5"/> Ganti Gambar
                              <input type="file" accept="image/*" onChange={(e) => handleBlockImageUpload(index, e)} className="hidden" />
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full border-2 border-dashed border-purple-200 hover:border-purple-400 rounded-xl bg-purple-50/30 flex flex-col items-center justify-center py-10 cursor-pointer transition-colors relative">
                          <ImageIcon className="w-10 h-10 text-purple-300 mb-2" />
                          <p className="text-sm font-bold text-purple-600">Klik untuk menyisipkan gambar</p>
                          <input type="file" accept="image/*" onChange={(e) => handleBlockImageUpload(index, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                      )}
                    </div>
                  ) : null}

                </div>

                {/* TOOLBAR AKSI (KANAN) - MUNCUL SAAT DI-HOVER */}
                <div className="flex flex-col gap-1 p-2 bg-gray-50 rounded-r-2xl border-l border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button type="button" onClick={() => moveBlockUp(index)} disabled={index === 0} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors" title="Geser ke Atas">
                    <ChevronUp className="w-5 h-5" />
                  </button>
                  <button type="button" onClick={() => moveBlockDown(index)} disabled={index === contentBlocks.length - 1} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors" title="Geser ke Bawah">
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  <div className="h-px w-full bg-gray-200 my-1"></div>
                  <button type="button" onClick={() => removeBlock(index)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus Blok">
                    <X className="w-5 h-5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* KONTROL TAMBAH BLOK */}
          <div className="flex flex-wrap gap-3 p-5 bg-gray-50 rounded-2xl border border-dashed border-gray-300 justify-center">
            <span className="w-full text-center text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Tambah Blok Konten</span>
            <button type="button" onClick={() => addBlock("paragraph")} className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:text-emerald-600 hover:border-emerald-200 shadow-sm transition-all hover:-translate-y-0.5">
              <Type className="w-4 h-4" /> Paragraf
            </button>
            <button type="button" onClick={() => addBlock("heading")} className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all hover:-translate-y-0.5">
              <Heading1 className="w-4 h-4" /> Heading
            </button>
            <button type="button" onClick={() => addBlock("quote")} className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:text-emerald-600 hover:border-emerald-200 shadow-sm transition-all hover:-translate-y-0.5">
              <Quote className="w-4 h-4" /> Kutipan
            </button>
            <button type="button" onClick={() => addBlock("image")} className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:text-purple-600 hover:border-purple-200 shadow-sm transition-all hover:-translate-y-0.5">
              <ImageIcon className="w-4 h-4" /> Gambar
            </button>
          </div>
        </div>

        {/* TOMBOL AKSI UTAMA */}
        <div className="flex justify-end gap-4 sticky bottom-8 z-20">
          <button type="button" onClick={() => setView("list")} className="bg-white border border-gray-200 px-6 py-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 shadow-xl transition-all">Batal</button>
          <button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center gap-2">
            {isLoading ? "Menyimpan..." : (editingId ? "Simpan Perubahan" : "Publikasikan Artikel")}
          </button>
        </div>

      </form>
    </div>
  );
}