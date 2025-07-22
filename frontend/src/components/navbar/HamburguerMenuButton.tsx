"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

const navItems = [
  { name: "Home", slug: "" },
  { name: "Productos", slug: "productos" },
  { name: "Contacto", slug: "contacto" },
  { name: "Carrito", slug: "cart" },

];

export default function HamburgerDropdownMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="relative lg:hidden" ref={containerRef}>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="inline-flex items-center justify-center p-2 rounded-md text-[#E0DED1]"
      >
        <Image
          src="/icons/menu.png"
          alt="Menu"
          width={20}
          height={20}
          className={clsx(
            "transition-transform duration-300",
            menuOpen && "rotate-90"
          )}
        />
      </button>

      {/* Menú desplegable */}
      {menuOpen && (
        <div
          className={clsx(
            "absolute top-full left-0 mt-4 z-50 w-56 rounded-2xl bg-[#E0DED1] shadow-xl ring-1 ring-[#C4BFAB] transition-all duration-300",
            "opacity-100 scale-100"
          )}
        >
          {/* Flechita */}
         <div className="flex justify-start pl-3.5 mt-[-8px]">
          <div
            className="w-0 h-0 
                       border-l-8 border-r-8 
                       border-l-transparent border-r-transparent 
                       border-b-8 border-b-[#E0DED1]"
          />
        </div>

                <div className=" w-full border-t border-[#C4BFAB]/40 mt-3"/>
          {/* Contenido del menú */}
          <div className="px-6 py-1 ">
            <ul className="space-y-0.5  text-sm font-semibold text-[#534f4f] ">
              {navItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}`}
                    onClick={() => setMenuOpen(false)} 
                    className="block rounded-xl px-4 py-1 transition-all duration-200 hover:bg-[#C4BFAB]/50 hover:text-[#a18c89]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
