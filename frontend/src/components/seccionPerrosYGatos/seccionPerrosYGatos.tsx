import Image from "next/image";
import Link from "next/link";

export const SeccionPerrosYGatos = () => {
  return (
     <>
      {/* SECCIÓN PERROS */}
      <Link href={{ pathname: "/productos", query: { petType: "dog" } }}>
        <div className="relative w-full h-52 bg-[#e6e2d8] flex flex-col items-center justify-end cursor-pointer">
          <button className="flex absolute h-10 w-36 top-4 px-6 py-3 bg-white text-[#b2a58e] items-center justify-center font-semibold text-xl rounded-full shadow-md mb-3">
            Perros
          </button>

          <Image
            src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/retrato-grupo-adorables-cachorros_apidhx.png"
            alt="Perros"
            width={600}
            height={400}
            className="w-auto h-auto"
          />
        </div>
      </Link>

      <div className="my-2"></div>

      {/* SECCIÓN GATOS */}
      <Link href={{ pathname: "/productos", query: { petType: "cat" } }}>
        <div className="relative w-full h-52 bg-[#e6e2d8] flex flex-col items-center justify-end cursor-pointer">
          <button className="flex absolute h-10 w-36 top-4 px-6 py-3 bg-white text-[#b2a58e] items-center justify-center font-semibold text-xl rounded-full shadow-md mb-3">
            Gatos
          </button>

          <Image
            src="https://res.cloudinary.com/dvndoqwfe/image/upload/c_crop,w_2000,h_1850/v1752545076/collaje-mascotas-muy-bonito-aislado_fbi6h2.png"
            alt="Gatos"
            width={600}
            height={250}
            className="w-auto h-auto"
          />
        </div>
      </Link>
    </>
  );
};

