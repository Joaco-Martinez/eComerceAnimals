'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function CouponAlert() {
  const [visible, setVisible] = useState(true);

  // Opcional: podés hacer que desaparezca solo después de X segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000); 

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-between gap-4 bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded-md shadow-md animate-fadeIn">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        <span className="text-sm font-medium">
          ¡Cupón aplicado! Si salís de nuestro sitio web podrías perderlo.
        </span>
      </div>
      <button onClick={() => setVisible(false)} className="text-yellow-700 hover:text-yellow-900 transition">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
