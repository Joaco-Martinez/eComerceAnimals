'use client'

import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2C4B4D] text-[#E0DED1] text-xs px-4 py-3 mt-6">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        
        <span className="text-[11px] text-center md:text-left">
          © {new Date().getFullYear()} <strong>Punky Pet®</strong>. Todos los derechos reservados.
        </span>

        <ul className="flex flex-wrap justify-center md:justify-end items-center gap-4 font-medium text-[11px]">
          <li>
            <Link href="/termsandconditions" className="hover:underline">Términos y condiciones</Link>
          </li>
          <li>
            <Link href="/faq" className="hover:underline">Preguntas frecuentes</Link>
          </li>
          <li>
            <Link href="/PoliticaCambiosyDevoluciones" className="hover:underline">Politica de cambios y devoluciones</Link>
          </li>
          <li>
            <Link href="/products?petType=dog" className="hover:underline">Perros</Link>
          </li>
          <li>
            <Link href="/products?petType=cat" className="hover:underline">Gatos</Link>
          </li>
          <li className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <a href="mailto:mascotiendavgbpets@gmail.com" className="hover:underline">Email</a>
          </li>
          <li className="flex items-center gap-1">
            <Instagram className="w-3 h-3" />
            <a href="https://www.instagram.com/punkypet" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
