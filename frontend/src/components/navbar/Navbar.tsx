"use client";

import { useState } from "react";
import SliderArriba from "../sliderArriba/SliderArriba";
import Logo from "./Logo";
import HamburgerDropdownMenu from "./HamburguerMenuButton";
import DesktopNavItems from "./DesktopNavItems";
import UserDropdown from "./UserDropdown";
import CartButton from "./CartButton";
import FavoritesButton from "./FavoritesButton";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);


  return (
    <>
      <SliderArriba />

      <nav className="antialiased">
        <div className="max-w-screen-xl mx-auto px-4 py-2 2xl:px-0">
          <div className="flex items-center justify-between">
            {/* Mobile: Botón menú hamburguesa */}
            <HamburgerDropdownMenu />
            {/* Logo */}
            <Logo />

            {/* Links grandes (solo desktop) */}
            <DesktopNavItems />

            {/* Acciones a la derecha */}
            <div className="flex items-center lg:gap-2">
              <UserDropdown userOpen={userOpen} setUserOpen={setUserOpen} />
              <FavoritesButton />
              <CartButton cartOpen={cartOpen} setCartOpen={setCartOpen} />
            </div>
          </div>

          
        </div>
      </nav>
    </>
  );
}
