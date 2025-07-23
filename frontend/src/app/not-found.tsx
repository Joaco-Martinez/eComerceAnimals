'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="bg-[#ffffff] rounded-2xl shadow-lg p-8 max-w-xl w-full text-center">
        {/* Logo arriba */}
        <div className="mb-6">
          <Image
            src="/punkypetpositivopng.png"
            alt="Punky Pet logo"
            width={420}
            height={420}
            className="mx-auto w-full max-w-[400px]" // Responsive sin perder calidad
            priority
          />
        </div>

        {/* Mensaje principal */}
        <h2 className="text-6xl sm:text-7xl font-bold mb-4" style={{ color: '#2C4B4D' }}>
          404
        </h2>
        <p className="text-lg sm:text-xl mb-8" style={{ color: '#918283' }}>
          ¡Uy! Esta página no existe o fue adoptada 🐾
        </p>

        {/* Botón */}
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg transition font-semibold"
          style={{
            backgroundColor: '#2C4B4D',
            color: '#FFFFFF',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#918283'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#2C4B4D'
          }}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
