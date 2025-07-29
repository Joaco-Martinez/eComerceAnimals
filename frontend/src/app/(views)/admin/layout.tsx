'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleLinkClick = () => setIsOpen(false)

  const links = [
    { href: '/admin/products', label: 'Gestionar productos' },
    { href: '/admin/categories', label: 'Gestionar categorías' },
    { href: '/admin/orders', label: 'Gestionar pedidos' },
    { href: '/admin/coupons', label: 'Cupones de descuento' },
    { href: '/admin/stats', label: 'Estadísticas' },
  ]

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#E0DED1]">
      {/* Top bar en mobile */}
      <div className="md:hidden p-4 flex items-center justify-between shadow-md bg-white">
        <h2 className="text-xl font-bold text-[#2C4B4D]">Panel Admin</h2>
        <button onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6 text-[#2C4B4D]" />
        </button>
      </div>

      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
  className={`
    fixed md:static top-0 right-0 z-50
    h-full md:h-screen w-64
    bg-[#C4BFAB] p-6 shadow-lg
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0
    md:flex md:flex-col md:justify-start md:pt-6 md:overflow-y-auto
  `}
>
  {/* Botón cerrar en mobile */}
  <div className="md:hidden flex justify-end mb-4">
    <button onClick={() => setIsOpen(false)}>
      <X className="h-6 w-6 text-white" />
    </button>
  </div>

  <nav className="flex flex-col gap-3">
    {links.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          pathname === href
            ? 'bg-[#2C4B4D] text-white'
            : 'text-[#2C4B4D] hover:bg-[#918283] hover:text-white'
        }`}
        onClick={handleLinkClick}
      >
        {label}
      </Link>
    ))}
  </nav>
</aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 md:ml-64 shadow-2xl">
        <div className="max-w-6xl mx-auto mt-6">{children}</div>
      </main>
    </div>
  )
}
