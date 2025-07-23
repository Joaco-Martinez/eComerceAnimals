"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Mis pedidos", href: "/user/orders" },
  { label: "Direcciones", href: "/user/addresses" },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-[#2C4B4D]">Mi Cuenta</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#2C4B4D]"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* Sidebar Desktop */}
        <aside className="hidden md:block w-60 border-r border-[#C4BFAB] pr-4">
          <nav className="space-y-2 text-sm">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`block px-4 py-2 rounded-lg transition font-medium ${
                  pathname === href
                    ? "bg-[#2C4B4D] text-white"
                    : "hover:bg-[#2C4B4D]/20 text-[#2C4B4D]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Sidebar Mobile (offcanvas desde la derecha) */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[#E0DED1] shadow-lg p-6 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 text-[#2C4B4D]"
          >
            <X className="w-6 h-6" />
          </button>
          <nav className="mt-10 space-y-4 text-sm">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg transition font-medium ${
                  pathname === href
                    ? "bg-[#2C4B4D] text-white"
                    : "hover:bg-[#2C4B4D]/20 text-[#2C4B4D]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Fondo semitransparente detrás del menú mobile */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Contenido */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
