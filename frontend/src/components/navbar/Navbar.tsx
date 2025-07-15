/* eslint-disable @next/next/no-img-element */
"use client";
import "../../app/globals.css";
import { useState } from "react";
import SliderArriba from "../sliderArriba/SliderArriba";
import Link from "next/link";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["Home", "Productos", "Contacto"];

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
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path strokeWidth={2} strokeLinecap="round" d="M5 7h14M5 12h14M5 17h14" />
              </svg>
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
              {navItems.map((text) => (
                <li key={text}>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>

            {/* ACCIONES (CARRITO, FAVORITOS, USER) */}
            <div className="flex items-center  lg:gap-2">
              {/* CARRITO */}
              <div className="relative">
                <button
                  onClick={() => setCartOpen(!cartOpen)}
                  className="inline-flex items-center p-2 rounded-lg text-[#E0DED1]"
                >
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 4h1.5L9 16h8m-8 0a2 2 0 100 4 2 2 0 000-4m8 0a2 2 0 100 4 2 2 0 000-4M7.312 7H19l-1.25 6.5H8.5"
                    />
                  </svg>
                  <span className="hidden sm:flex ml-1">My Cart</span>
                </button>

                {/* CARRITO DESPLEGABLE */}
                {cartOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-96 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg space-y-4">
                    {[
                      { name: "Apple iPhone 15", price: "$599", qty: 1 },
                      { name: "Apple iPad Air", price: "$499", qty: 1 },
                    ].map((item, i) => (
                      <div key={i} className="grid grid-cols-2 items-center">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.price}</p>
                        </div>
                        <div className="flex justify-end items-center gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Qty: {item.qty}
                          </span>
                          <button className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path
                                fillRule="evenodd"
                                d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    <a
                      href="#"
                      className="block w-full text-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
                    >
                      Proceed to Checkout
                    </a>
                  </div>
                )}
              </div>

              {/* FAVORITOS */}
              <button className="text-[#E0DED1]">
                <HeartOutline className="w-6 h-6" />
              </button>

              {/* USUARIO */}
              <div className="relative">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="inline-flex items-center p-2 rounded-lg text-[#E0DED1]"
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth={2}
                      d="M7 17v1a1 1 0 001 1h8a1 1 0 001-1v-1a3 3 0 00-3-3h-4a3 3 0 00-3 3Zm8-9a3 3 0 11-6 0 3 3 0 016 0Z"
                    />
                  </svg>
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
            </div>
          </div>

          {/* MENÚ MOBILE */}
          {menuOpen && (
            <div className="mt-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-3 px-4 lg:hidden">
              <ul className="space-y-3 text-sm font-medium text-gray-900 dark:text-white">
                {navItems.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500">
                      {item}
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
