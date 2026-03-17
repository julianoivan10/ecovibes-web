import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// 1. Mengambil semua artikel
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("articles").order("desc").collect();
  },
});

// 2. Mengambil 1 artikel berdasarkan Slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("articles").withIndex("by_slug", (q) => q.eq("slug", args.slug)).first();
  },
});

// ==========================================
// FITUR BARU: CREATE, UPDATE, DELETE & UPLOAD
// ==========================================

// 3. Membuat artikel baru
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    date: v.string(),
    tag: v.string(),
    category: v.string(),
    author: v.string(),
    excerpt: v.string(),
    image: v.string(),
    content: v.array(
      v.object({
        type: v.string(),
        text: v.optional(v.string()),
        imageSrc: v.optional(v.string()),
        url: v.optional(v.string()),
        alt: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("articles", args);
  },
});

// 4. Mengedit (Update) artikel
export const update = mutation({
  args: {
    id: v.id("articles"), // Membutuhkan ID artikel yang ingin diedit
    title: v.string(),
    slug: v.string(),
    category: v.string(),
    excerpt: v.string(),
    image: v.string(),
    content: v.array(
      v.object({
        type: v.string(),
        text: v.optional(v.string()),
        imageSrc: v.optional(v.string()),
        url: v.optional(v.string()),
        alt: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

// 5. Menghapus artikel
export const remove = mutation({
  args: { id: v.id("articles") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// 6. Generate URL untuk Upload Gambar ke Convex
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// 7. Mengambil URL Gambar yang sudah di-upload
export const getImageUrl = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});