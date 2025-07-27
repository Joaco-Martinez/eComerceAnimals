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
      console.log(error)
        toast.error('Error al agregar a la wishlist');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button onClick={handleAdd}>
        <Image
          src="/icons/corazon.png"
          alt="Favorito"
          width={32}
          height={28}
          className="sm:w-[45px] sm:h-[45px]"
        />
      </button>
    </div>
  );
}
