import Image from "next/image";

const PromocionCuotas = () => {
  return (
    <div className="w-full h-16 bg-[#E0DED1] px-4 py-3 flex items-center justify-center text-black">
      <div className="flex items-center justify-center gap-3">
        <Image src="/icons/cuotas.png" alt="Cuotas" width={53} height={53} />
        <div className="text-sm sm:text-base text-left font-light">
          <h5 className="font-semibold leading-none">3 y 6 CUOTAS</h5>
          <h5 className="text-xs leading-none font-light">con Mercado Pago</h5>
        </div>
      </div>
    </div>
  );
};

export default PromocionCuotas;
