'use client';

import Image from 'next/image';
import WishlistDrawer from '../WishlistDrawer/WishlistDrawer';

type Props = {
  wishlistOpen: boolean;
  setWishlistOpen: (val: boolean) => void;
};

export default function FavoritesButton({ wishlistOpen, setWishlistOpen }: Props) {
  return (
    <div className="relative">
      <button
        onClick={() => setWishlistOpen(!wishlistOpen)}
        className="inline-flex items-center p-2 rounded-lg text-[#E0DED1]"
      >
        <Image src="/icons/like.png" alt="Favoritos" width={22} height={25} />
        <span className="hidden sm:flex ml-1">Favoritos</span>
      </button>
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </div>
  );
}
