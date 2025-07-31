'use client';

import Image from 'next/image';
import WishlistDrawerDesktop from '../WishlistDrawer/WishlistDrawerDesktop';

type Props = {
  wishlistOpen: boolean;
  setWishlistOpen: (val: boolean) => void;
};

export default function FavoritesButton({ wishlistOpen, setWishlistOpen }: Props) {
  return (
    <div className="relative">
      <button
        onClick={() => setWishlistOpen(!wishlistOpen)}
        className="inline-flex items-center p-2 rounded-lg text-[#E0DED1] cursor-pointer"
      >
        <Image src="/icons/like.png" alt="Favoritos" width={22} height={25} />

      </button>
      <WishlistDrawerDesktop isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </div>
  );
}
