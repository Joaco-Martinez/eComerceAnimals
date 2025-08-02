import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/navbar/Navbar";
// import WhatsappLink from "@/components/WhatsappLink/WhatsappLink";
import { AuthProvider } from '../context/authContext';
import { AnonCartProvider } from '../context/anonCartContext';
import { CheckoutProvider } from '@/context/checkoutContext';
import CookieBanner from '@/components/CookieBanner/CookieBanner'
import SWRegister from "@/components/SWRegister.tsx/SWRegister";
import {Footer} from "@/components/Footer/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Punky Pet - Estilo punk para el mundo pet",
  description: "Productos con estilo para tu perro o gato. Envíos a todo el país. ¡Descubrí tu estilo punk!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
  <body className={`h-full flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}>
    <AuthProvider>
      <AnonCartProvider>
        <CheckoutProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Toaster />
          <CookieBanner />
          <SWRegister />
          <Footer />
        </CheckoutProvider>
      </AnonCartProvider>
    </AuthProvider>
  </body>
</html>
  );
}
