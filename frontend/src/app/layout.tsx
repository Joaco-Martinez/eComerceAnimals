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
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Punky Pet",
  description: "Tienda de productos para mascotas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <AnonCartProvider>
        <CheckoutProvider>
        <Navbar /> 
        {children}
        <Toaster />
        {/* <WhatsappLink /> */}
        <CookieBanner />
        </CheckoutProvider>
        </AnonCartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
