// components/PromosBanner.tsx
import Image from "next/image";

export default function PromosBanner() {
  return (
    <section className="bg-[#F8F8F8] py-6 px-4 w-full shadow-md rounded-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
        {/* Ítem 1 */}
        <div className="flex items-center gap-4 w-full md:w-1/3">
          <Image src="/icons/transferencia.png" alt="Icono transferencia" width={60} height={60} />
          <div className="text-sm leading-tight">
            <p className="font-bold text-[#2C4B4D]">20% OFF</p>
            <p className="text-[#918283] uppercase text-xs">Por transferencia</p>
          </div>
        </div>

        {/* Ítem 2 */}
        <div className="flex items-center gap-4 w-full md:w-1/3">
          <Image src="/icons/cuotas.png" alt="Icono cuotas" width={60} height={60} />
          <div className="text-sm leading-tight">
            <p className="font-bold text-[#2C4B4D]">3 y 6 CUOTAS</p>
            <p className="text-[#918283] uppercase text-xs">con Mercado Pago</p>
          </div>
        </div>

        {/* Ítem 3 */}
        <div className="flex items-center gap-4 w-full md:w-1/3">
          <Image src="/icons/envios.png" alt="Icono envíos" width={60} height={60} />
          <div className="text-sm leading-tight">
            <p className="font-bold text-[#2C4B4D]">ENVÍOS</p>
            <p className="text-[#918283] uppercase text-xs">A todo el país</p>
          </div>
        </div>
      </div>
    </section>
  );
}
