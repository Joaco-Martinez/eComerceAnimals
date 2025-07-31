
// components/Navbar/Logo.tsx
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/punkypetisotipo2png.png"
        alt="logo"
        className="object-contain w-14 sm:w-18 h-auto"
        width={104}
        height={104}
      />
      <h4 className="text-4xl sm:text-9xl text-[#918283] ml-[-0.5rem] relative top-[2px] sm:top-[4px]">
        Punky Pet
      </h4>
    </Link>
  );
}