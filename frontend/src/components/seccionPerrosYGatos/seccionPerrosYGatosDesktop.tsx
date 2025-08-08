"use client";
import Image from "next/image";
import Link from "next/link";

export const SeccionPerrosYGatosDesktop = () => {
  return (
    <div className="hidden md:flex w-full gap-6 mt-6 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
  {/* Perros */}
  <Link
    href={{ pathname: "/productos", query: { petType: "dog" } }}
    className="flex-1 relative bg-[#e6e2d8] h-72 md:h-80 lg:h-96 flex items-end justify-center overflow-hidden shadow-lg hover:scale-[1.02] transition"
  >
    <button className="absolute top-5 px-8 py-3 bg-white text-[#b2a58e] font-semibold text-xl rounded-full shadow">
      Perros
    </button>
    <Image
      src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/retrato-grupo-adorables-cachorros_apidhx.png"
      alt="Perros"
      width={700}
      height={500}
      className="object-cover h-auto w-auto"
    />
  </Link>

  {/* Gatos */}
  <Link
    href={{ pathname: "/productos", query: { petType: "cat" } }}
    className="flex-1 relative bg-[#c4bfab] h-72 md:h-80 lg:h-96 flex items-end justify-center overflow-hidden shadow-lg hover:scale-[1.02] transition"
  >
    <button className="absolute top-5 px-8 py-3 bg-white text-[#b2a58e] font-semibold text-xl rounded-full shadow">
      Gatos
    </button>
    <Image
      src="https://res.cloudinary.com/dvndoqwfe/image/upload/c_crop,w_2000,h_1850/v1752545076/collaje-mascotas-muy-bonito-aislado_fbi6h2.png"
      alt="Gatos"
      width={700}
      height={500}
      className="object-cover h-auto w-auto"
    />
  </Link>
</div>

  );
};
