// components/CookieBanner.tsx
'use client'

import { useEffect, useState } from 'react'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasAccepted = localStorage.getItem('cookiesAccepted')
    if (!hasAccepted) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white text-sm p-4 flex flex-col sm:flex-row justify-between items-center z-50">
      <span className="mb-2 sm:mb-0">Al navegar en este sitio aceptás el uso de cookies.</span>
      <button
        onClick={acceptCookies}
        className="bg-white text-gray-800 font-semibold px-4 py-1 rounded hover:bg-gray-200 transition"
      >
        Aceptar
      </button>
    </div>
  )
}

