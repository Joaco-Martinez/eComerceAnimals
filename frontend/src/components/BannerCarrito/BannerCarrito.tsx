export default function BannerCarrito() {
  return (
    
<div className="bg-[#2C4B4D] text-white px-4 sm:px-10 py-2 text-sm font-light">
  <div className="flex flex-col sm:flex-nowrap justify-between items-center gap-2 sm:gap-4">
    {/* Izquierda */}
    <div className="flex items-center gap-2">
      <span className="text-4xl sm:text-3xl font-bold leading-none">20%</span>
      <div className="leading-none">
        <span className="uppercase text-[10px] sm:text-xs block tracking-wider">
          OFF POR
        </span>
        <span className="uppercase text-[11px] sm:text-sm font-semibold tracking-wider">
          TRANSFERENCIA
        </span>
      </div>
    </div>

    {/* Separador */}
    <div className="hidden sm:block w-px h-6 bg-white opacity-30" />

    {/* Derecha */}
    <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-[11px] sm:text-sm text-white/80">
      <span>
        <strong className="text-white">3 CUOTAS</strong> s/ interés
      </span>
      <span>
        <strong className="text-white">6 CUOTAS</strong> s/ interés
      </span>
      <span>
        <strong className="text-white">ENVÍOS</strong> a todo el país
      </span>
    </div>
  </div>
</div>


  );
}
