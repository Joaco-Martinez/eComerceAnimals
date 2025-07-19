/* eslint-disable @next/next/no-img-element */
"use client";
import "../../app/globals.css";
import { useState } from "react";
import SliderArriba from "../sliderArriba/SliderArriba";
import Link from "next/link";
import Image from "next/image";
import CartDrawer from "../CartDrawer/CartDrawer";
export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "" },
    { name: "Productos", slug: "productos" },
    { name: "Contacto", slug: "contacto" },
  ];

  return (
    <>
      <SliderArriba />
      <nav className="antialiased">
        <div className="max-w-screen-xl mx-auto px-4 py-2 2xl:px-0">
          <div className="flex items-center justify-between">
            {/* BOTÓN HAMBURGUESA (solo mobile) */}
            <button
              type="button"
              className="inline-flex lg:hidden items-center justify-center p-2 rounded-md text-[#E0DED1]"
              onClick={() => setMenuOpen(!menuOpen)}
              >
              <Image src="/icons/menu.png" alt="Menu" width={20} height={20} />
            </button>

              {/* LOGO + NOMBRE */}
            <Link href="/" className="flex items-center ">
                <img
                  src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/punky_pet_isotipo_2_png_eerwev"
                  alt="logo"
                  className="w-12 h-12 object-contain"
                />
              <h4 className="text-4xl sm:text-5xl text-[#918283] ml-[-0.5rem]  relative top-[2px] ">
                Punky Pet
              </h4>
            </Link>


            {/* LINKS DESKTOP */}
            <ul className="hidden lg:flex items-center gap-6 md:gap-8 py-3">
              {navItems.map((item) => (
    <li key={item.slug}>
      <a href={`/${item.slug}`} className="hover:text-primary-700 dark:hover:text-primary-500">
        {item.name}
      </a>
    </li>
  ))}
            </ul>

            {/* ACCIONES (CARRITO, FAVORITOS, USER) */}
            <div className="flex items-center  lg:gap-2">
              
              {/* USUARIO */}
              <div className="relative">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="inline-flex items-center p-2 rounded-lg text-[#E0DED1]"
                >
                <Image src="/icons/perfil.png" alt="User" width={22} height={25} />
                </button>

                {/* USER MENU */}
                {userOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-56 rounded-lg bg-white dark:bg-gray-700 shadow divide-y divide-gray-100 dark:divide-gray-600">
                    <ul className="p-2 text-sm text-gray-900 dark:text-white">
                      {[
                        "My Account",
                        "My Orders",
                        "Settings",
                        "Favourites",
                        "Delivery Addresses",
                        "Billing Data",
                      ].map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="p-2">
                      <a
                        href="#"
                        className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Sign Out
                      </a>
                    </div>
                  </div>
                )}
              </div>
              {/* FAVORITOS */}
              <button className="text-[#E0DED1]">
                <Image src="/icons/like.png" alt="Favoritos" width={22} height={25} />
              </button>
              {/* CARRITO */}
              <div className="relative">
                <button
                  onClick={() => setCartOpen(!cartOpen)}
                  className="inline-flex items-center p-2 rounded-lg text-[#E0DED1]"
                >
                  <Image src="/icons/carrito.png" alt="Carrito" width={20.1} height={20} />
                  <span className="hidden sm:flex ml-1">My Cart</span>
                </button>

                {/* CARRITO DESPLEGABLE */}
                <CartDrawer
  isOpen={cartOpen}
  onClose={() => setCartOpen(false)}
/>
              </div>
              

            </div>
          </div>

          {/* MENÚ MOBILE */}
          {menuOpen && (
            <div className="mt-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-3 px-4 lg:hidden">
              <ul className="space-y-3 text-sm font-medium text-gray-900 dark:text-white">
  {navItems.map((item) => (
    <li key={item.slug}>
      <a href={`/${item.slug}`} className="hover:text-primary-700 dark:hover:text-primary-500">
        {item.name}
      </a>
    </li>
  ))}
</ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
