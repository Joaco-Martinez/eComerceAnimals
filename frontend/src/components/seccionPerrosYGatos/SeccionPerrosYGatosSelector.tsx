"use client";
import { SeccionPerrosYGatos } from "./seccionPerrosYGatos";
import { SeccionPerrosYGatosDesktop } from "./seccionPerrosYGatosDesktop";

export const SeccionPerrosYGatosSelector = () => {
  return (
    <>
      {/* Mobile: visible solo en pantallas chicas */}
      <div className="block md:hidden">
        <SeccionPerrosYGatos />
      </div>

      {/* Desktop: visible solo en pantallas medianas en adelante */}
      <div className="hidden md:block">
        <SeccionPerrosYGatosDesktop />
      </div>
    </>
  );
};
