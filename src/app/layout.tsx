import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Font yang lebih modern dari Inter
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from 'sonner';

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoVibes | Munchware",
  description: "Bite into innovation. Leave zero footprint.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${jakarta.className} bg-[#FAFAFA] text-gray-800 antialiased relative`}>
        <Navbar />
        <main>{children}</main>
        <Toaster position="bottom-center" richColors />
        <ScrollToTop />
      </body>
    </html>
  );
}