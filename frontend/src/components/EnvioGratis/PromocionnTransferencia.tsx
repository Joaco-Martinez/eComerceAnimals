import Image from "next/image";

const PromocionTransferencia = () => {
  return (
    <div className="w-full h-16 bg-[#E0DED1] px-4 py-3 flex items-center justify-center text-black">
      <div className="flex items-center justify-center gap-3">
        <Image src="/icons/transferencia.png" alt="Transferencia" width={53} height={53} />
        <div className="text-sm sm:text-base text-left font-light">
          <h5 className="font-semibold leading-none">20% OFF</h5>
          <h5 className="text-xs leading-none font-light">por transferencia</h5>
        </div>
      </div>
    </div>
  );
};

export default PromocionTransferencia;
