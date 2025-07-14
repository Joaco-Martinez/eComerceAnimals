/* eslint-disable @next/next/no-img-element */
"use client";
// components/Navbar.tsx
import "../../app/globals.css";
import { useState } from "react";
import SliderArriba from "../../components/sliderArriba/SliderArriba";
import Link from "next/link";
export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <SliderArriba />
    <nav className=" antialiased">
      <div className="max-w-screen-xl  px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
                     {/* MOBILE MENU */}
          <button
              type="button"
              className="inline-flex lg:hidden items-center justify-center p-2 rounded-md text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
          
          {/* LOGO + LINKS */}
          <div className="flex items-center space-x-8">
            <div className="shrink-0 flex items-center ">
              <Link href="/" title="">
                <img
                  className="block w-auto h-15 "
                  src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/punky_pet_isotipo_2_png_eerwev"
                  alt="logo"
                />
                
              </Link>
              <h4 className="font-chatime text-3xl text-[#918283] ">
                Punky Pet
              </h4>
            </div>

            <ul className="hidden lg:flex items-center gap-6 md:gap-8 py-3">
              {["Home", "Productos", "Contacto",].map((text) => (
                <li key={text}>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500 hover:text-black"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center lg:space-x-2 gap-2">
            {/* CART */}
            <div className="relative">
              <button
                onClick={() => setCartOpen(!cartOpen)}
                type="button"
                className="inline-flex items-center p-2 rounded-lg text-sm font-medium text-white  hover:bg-[#44332c] cursor-pointer"
              >
                <svg
                  className="w-7 h-7 lg:me-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4Zm8 0a2 2 0 100 4 2 2 0 000-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
                <span className="hidden sm:flex">My Cart</span>
              </button>

              {cartOpen && (
                <div className="absolute right-0 z-10 mt-2 w-96 space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                  {[
                    { name: "Apple iPhone 15", price: "$599", qty: 1 },
                    { name: "Apple iPad Air", price: "$499", qty: 1 },
                    { name: "Apple Watch SE", price: "$598", qty: 2 },
                    { name: "Sony Playstation 5", price: "$799", qty: 1 },
                    { name: 'Apple iMac 20"', price: "$8,997", qty: 3 },
                  ].map((item, index) => (
                    <div key={index} className="grid grid-cols-2 items-center">
                      <div>
                        <a
                          href="#"
                          className="truncate text-sm font-semibold text-gray-900 dark:text-white hover:underline"
                        >
                          {item.name}
                        </a>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.price}
                        </p>
                      </div>
                      <div className="flex items-center justify-end gap-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Qty: {item.qty}
                        </span>
                        <button className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
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
                    className="inline-flex justify-center items-center w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
                  >
                    Proceed to Checkout
                  </a>
                </div>
              )}
            </div>

            {/* USER */}
            <div className="relative">
              <button
                onClick={() => setUserOpen(!userOpen)}
                type="button"
                className="inline-flex items-center p-2 rounded-lg text-sm font-medium text-white hover:bg-[#44332c] cursor-pointer"
              >
                <svg
                  className="w-7 h-7 me-1"
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
                      className="block px-3 py-2 rounded-md text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Sign Out
                    </a>
                  </div>
                </div>
              )}
            </div>


            
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {menuOpen && (
          <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-3 px-4 mt-4">
            <ul className="space-y-3 text-sm font-medium text-gray-900 dark:text-white">
              {[
                "Home",
                "Best Sellers",
                "Gift Ideas",
                "Games",
                "Electronics",
                "Home & Garden",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500 ">
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
