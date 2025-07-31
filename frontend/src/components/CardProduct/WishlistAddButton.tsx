'use client';

import Image from 'next/image';
import { toggleWishlistItem } from '@/service/wishlistService';
import { useAuthContext } from '@/context/authContext';
import toast from 'react-hot-toast';

interface Props {
  productId: string;
}

export default function WishlistAddButton({ productId }: Props) {
  const { isAuth } = useAuthContext();

  const handleAdd = async () => {
    if (!isAuth) {
      toast.error('Debés iniciar sesión para agregar a favoritos');
      return;
    }

    try {
      await toggleWishlistItem(productId);
      toast.success('Producto agregado a la wishlist');
    } catch (error) {
      console.log(error);
      toast.error('Error al agregar a la wishlist');
    }
  };

  return (
    <div className="flex items-center justify-center cursor-pointer">
      <button onClick={handleAdd} className="p-1">
        <div className="relative w-8 h-7 sm:w-11 sm:h-11">
          <Image
            src="/icons/corazon.png"
            alt="Favorito"
            fill
            sizes="(max-width: 640px) 32px, 45px"
            className="object-contain"
            priority
          />
        </div>
      </button>
    </div>
  );
}
