'use client';

import { useEffect, useState } from 'react';
import { X, Trash } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { getWishlist, toggleWishlistItem } from '@/service/wishlistService';
import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import BannerCarrito from '../BannerCarrito/BannerCarrito';
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface WishlistItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: { url: string }[];
  };
}

export default function WishlistDrawer({ isOpen, onClose }: Props) {
  const { isAuth } = useAuthContext();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && isAuth) {
      getWishlist()
        .then((res) => setWishlistItems(res))
        .catch((err) => console.error(err));
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isAuth]);

  const removeFromWishlist = async (productId: string) => {
    try {
      await toggleWishlistItem(productId);
      setWishlistItems((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
      toast.success('Producto eliminado de favoritos');
    } catch (error) {
      console.log(error)
      toast.error('Error al eliminar de wishlist');
    }
  };

const seguirComprando = () => {
  router.push('/productos');
  onClose();
};

  const goToProduct = (id: string) => {
    router.push(`/product/${id}`);
    onClose();
  };

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 h-full w-11/12 bg-gray-100 shadow-lg z-50 transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >

        <div className="text-white flex justify-between items-center px-4 py-2">
                <BannerCarrito />
              </div>
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300">
        <h2 className="text-lg font-bold text-[#918283]">MIS FAVORITOS</h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-4 overflow-y-auto max-h-[80vh]">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm"
            >
              <Image
                src={item.product.images?.[0]?.url || '/placeholder.jpg'}
                alt={item.product.name}
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3
                  onClick={() => goToProduct(item.product.id)}
                  className="text-sm font-semibold text-black cursor-pointer hover:underline"
                >
                  {item.product.name}
                </h3>
                <p className="text-sm text-gray-600">
                  ${item.product.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => removeFromWishlist(item.productId)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-sm">
            No tenés productos en tu wishlist.
          </p>
        )}
      </div>

      {/* Acciones */}
      <div className="p-4">
        <button
          onClick={seguirComprando}
          className="w-full border border-gray-400 py-2 rounded-full text-gray-700"
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
}
