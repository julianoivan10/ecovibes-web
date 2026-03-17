import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  articles: defineTable({
    title: v.string(),
    slug: v.string(),
    date: v.string(),
    tag: v.string(),
    category: v.string(),
    author: v.string(),
    excerpt: v.string(),
    image: v.string(),
    // Kita simpan konten sebagai array objek agar sesuai dengan desain UI artikel Anda
    content: v.array(
      v.object({
        type: v.string(),
        text: v.optional(v.string()),
        imageSrc: v.optional(v.string()),
        url: v.optional(v.string()),
        alt: v.optional(v.string()),
      })
    ),
  }).index("by_slug", ["slug"]), // Membuat index pencarian agar loading artikel per-slug sangat cepat
});