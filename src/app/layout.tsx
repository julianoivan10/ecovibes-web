import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Font yang lebih modern dari Inter
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from 'sonner';
import ConvexClientProvider from "@/components/ConvexClientProvider";
import NavigationWrapper from "@/components/NavigationWrapper";
import { ClerkProvider } from "@clerk/nextjs";

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
        <ClerkProvider>
          <ConvexClientProvider>
            <NavigationWrapper>
              {children}
            </NavigationWrapper>
            <Toaster position="top-center" richColors />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}