import { useEffect, useRef } from "react";
import Image from "next/image";
import { useAuthContext } from "@/context/authContext";
import Link from "next/link";

type Props = {
  userOpen: boolean;
  setUserOpen: (val: boolean) => void;
};

export default function UserDropdown({ userOpen, setUserOpen }: Props) {
  const { user } = useAuthContext();
  const menuRef = useRef<HTMLDivElement>(null);
    // const user = true
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserOpen(false);
      }
    };
    if (userOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userOpen, setUserOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setUserOpen(!userOpen)}
        className="inline-flex items-center p-2 rounded-lg text-[#E0DED1]"
      >
        <Image src="/icons/perfil.png" alt="User" width={22} height={25} />
      </button>

     {userOpen && (
  <div className="absolute right-[-0.5rem] z-50 mt-2 w-64">
    {/* FLECHITA simple */}
    <div className="flex justify-end pr-5">
      <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#E0DED1] " />
    </div>

    {/* CUERPO DEL MENÚ */}
    <div className="rounded-2xl bg-[#E0DED1]  shadow-xl ring-1 ring-[#C4BFAB] overflow-hidden transition-all duration-300">
      <div className="font-semibold text-[#534f4f]">

      <ul className="p-2 text-sm   space-y-1">
        {user && [
            "Mi Cuenta",
            "Mis Pedidos",
            "Direcciones de envio",
        ].map((item) => (
            <li key={item}>
            <a
              href="#"
              className="block px-4 py-2 rounded-lg hover:bg-[#C4BFAB]/40  transition-colors duration-200"
              >
              {item}
            </a>
          </li>
        ))}
      </ul>
        </div>

      <div className="p-2 border-t border-[#C4BFAB]/40 font-semibold text-[#534f4f] space-y-1">
        {user ? (
          <Link
            href="#"
            className="block px-4 py-2 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-100  transition-colors"
          >
            Cerrar sesión
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              onClick={() => setUserOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm hover:bg-[#C4BFAB]/40 "
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              onClick={() => setUserOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm hover:bg-[#C4BFAB]/40 "
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
}