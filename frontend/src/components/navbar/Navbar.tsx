"use client";

import { useState } from "react";
import SliderArriba from "../sliderArriba/SliderArriba";
import Logo from "./Logo";
import HamburgerDropdownMenu from "./HamburguerMenuButton";
import DesktopNavItems from "./DesktopNavItems";
import UserDropdown from "./UserDropdown";
import CartButton from "./CartButton";
import FavoritesButton from "./FavoritesButton";
import LogicaSearchbar from "@/components/LogicaSearchbar/LogicaSearchbar";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [ wishlistOpen, setWishlistOpen ] = useState(false);

  return (
    <div>
  <SliderArriba />

  <nav className="antialiased">
    <div className="max-w-screen-xl mx-auto px-4 py-2 md:px-6 lg:px-8">
      <div className="flex items-center justify-between relative h-18">
        {/* Izquierda */}
        <div className="flex items-center gap-4">
          <HamburgerDropdownMenu />

          {/* Ítems solo visibles desde md (≥768px) */}
          <div className="hidden md:flex gap-4">
            <DesktopNavItems />
          </div>
        </div>

        {/* Logo en el centro solo en XL para que haya espacio */}
        <div className="hidden xl:block absolute left-1/2 transform -translate-x-1/2 scale-150">
          <Logo />
        </div>

        {/* Logo para mobile/tablet */}
        <div className="xl:hidden flex items-center">
          <Logo />
        </div>

        {/* Derecha */}
        <div className="flex items-center gap-2">
          {/* Searchbar visible solo en md+ */}
          <div className="hidden md:block">
            <LogicaSearchbar />
          </div>

          <UserDropdown userOpen={userOpen} setUserOpen={setUserOpen} />
          <FavoritesButton wishlistOpen={wishlistOpen} setWishlistOpen={setWishlistOpen} />
          <CartButton cartOpen={cartOpen} setCartOpen={setCartOpen} />
        </div>
      </div>
    </div>
  </nav>

  {/* Searchbar mobile abajo */}
  <div className="md:hidden mt-2 px-4">
    <LogicaSearchbar />
  </div>
</div>
  );
}
