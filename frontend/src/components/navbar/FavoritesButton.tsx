import Image from "next/image";

export default function FavoritesButton() {
  return (
    <button className="text-[#E0DED1]">
      <Image src="/icons/like.png" alt="Favoritos" width={22} height={25} />
    </button>
  );
}