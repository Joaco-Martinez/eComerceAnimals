import { TruckIcon } from "@heroicons/react/24/outline";
const EnvioGratis = () => {
  return (
    <div className="w-full h-16 bg-[#E0DED1] px-4 py-3 flex items-center justify-center text-black">
  {/* Línea superior: ícono y texto */}
  <div className="flex items-center justify-center gap-3">
    <TruckIcon className="w-8 h-8 text-[#C4BFAB]" />
     
    <div className="text-sm sm:text-base text-left font-light">
      <h5 className="font-semibold leading-none">Envíos GRATIS</h5>
      <h5 className="text-xs leading-none font-light">desde los $45.000 a todo el país</h5>
    </div>
  </div>
</div>

  );
};

export default EnvioGratis;

