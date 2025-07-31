import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import namer from "color-namer";
type CartItemType = {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  size: string;
  color: string; // en formato hex (ej: "#FF5733")
  quantity: number;
};
type Props = {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function CartItem({ item, onIncrease, onDecrease }: Props) {
  const colorName =
    namer(item.color)?.basic?.[0]?.name.charAt(0).toUpperCase() +
    namer(item.color)?.basic?.[0]?.name.slice(1);

  return (
    <div className="flex gap-3 items-center">
      <Image
        src={item.product.image}
        alt={item.product.name}
        width={60}
        height={60}
        className="rounded"
      />
      <div className="flex items-center flex-1">
        <div className="flex flex-col gap-2 justify-between py-2 flex-1">
          <span className="font-bold text-sm text-black">{item.product.name}</span>
          <div className="text-xs text-gray-600">
            ({item.size}, {colorName})
          </div>
          <span className="text-sm text-gray-500">
            ${item.product.price.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center border-gray-300 border-2 rounded-3xl gap-1">
          <button onClick={onDecrease} className="p-1 cursor-pointer">
            <Minus size={14} />
          </button>
          <span className="text-sm">{item.quantity}</span>
          <button onClick={onIncrease} className="p-1 cursor-pointer">
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
