'use client';

import { useEffect } from 'react';

export default function SWRegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => console.log("✅ SW registrado:", reg.scope))
          .catch((err) => console.error("❌ Error al registrar SW:", err));
      });
    } else {
      console.log("🛑 No se registra el SW (entorno no producción)");
    }
  }, []);

  return null;
}
