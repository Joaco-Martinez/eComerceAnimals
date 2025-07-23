'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleLinkClick = () => setIsOpen(false)

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-punky-cream">
      {/* Top bar en mobile */}
      <div className="md:hidden p-4 flex items-center justify-between shadow-md bg-white">
        <h2 className="text-xl font-bold text-[#2C4B4D]">Panel Admin</h2>
        <button onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6 text-[#2C4B4D]" />
        </button>
      </div>

      {/* Overlay + Sidebar en mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`
          fixed md:static top-0 right-0 z-50 h-full w-64
          bg-[#C4BFAB] text-white p-6 shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0
        `}
      >
        {/* Cerrar en mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          <Link
            href="/admin/products"
            className={`hover:underline ${
              pathname === '/admin/products' ? 'text-[#2C4B4D]' : ''
            }`}
            onClick={handleLinkClick}
          >
            Gestionar productos
          </Link>
          <Link
            href="/admin/categories"
            className={`hover:underline ${
              pathname === '/admin/categories' ? 'text-[#2C4B4D]' : ''
            }`}
            onClick={handleLinkClick}
          >
            Gestionar categorías
          </Link>
          <Link
            href="/admin/orders"
            className={`hover:underline ${
              pathname === '/admin/orders' ? 'text-[#2C4B4D]' : ''
            }`}
            onClick={handleLinkClick}
          >
            Gestionar órdenes
          </Link>
          <Link
            href="/admin/stats"
            className={`hover:underline ${
              pathname === '/admin/stats' ? 'text-[#2C4B4D]' : ''
            }`}
            onClick={handleLinkClick}
          >
            Estadísticas
          </Link>
          <Link
            href="/admin/coupons"
            className={`hover:underline ${
              pathname === '/admin/coupons' ? 'text-[#2C4B4D]' : ''
            }`}
            onClick={handleLinkClick}
          >
            Cupones de descuento
          </Link>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 md:ml-64">{children}</main>
    </div>
  )
}
