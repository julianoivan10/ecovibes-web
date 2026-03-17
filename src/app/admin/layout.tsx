// src/app/admin/layout.tsx
import type { Metadata } from "next";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata: Metadata = {
  title: "EcoCMS | Admin Dashboard",
  description: "Manajemen Konten Internal EcoVibes",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Kita panggil komponen client yang sudah dibuat di langkah 1
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}