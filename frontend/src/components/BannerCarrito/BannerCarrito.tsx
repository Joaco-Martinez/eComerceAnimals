export default function BannerCarrito() {
  return (
    <div className="bg-[#2C4B4D] text-white px-4 py-2 text-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        {/* Izquierda: Descuento */}
        <div className="flex items-center gap-2">
          <span className="text-3xl font-extrabold text-white leading-none">20%</span>
          <div className="leading-none">
            <span className="uppercase text-[10px] block tracking-wide text-white/70">
              OFF POR
            </span>
            <span className="uppercase text-[12px] font-semibold tracking-wide">
              TRANSFERENCIA
            </span>
          </div>
        </div>

        {/* Separador */}
        <div className="hidden sm:block h-6 w-px bg-white/40" />

        {/* Derecha: Beneficios */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-[11px] sm:text-xs text-white/90">
          <span><strong className="text-white">3 CUOTAS</strong> s/ interés</span>
          <span><strong className="text-white">6 CUOTAS</strong> s/ interés</span>
          <span><strong className="text-white">ENVÍOS</strong> a todo el país</span>
        </div>
      </div>
    </div>
  );
}
