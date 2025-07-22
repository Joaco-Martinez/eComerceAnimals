
// components/Navbar/Logo.tsx
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center ">
      <Image
        src="https://res.cloudinary.com/dvndoqwfe/image/upload/v1720542290/punky_pet_isotipo_2_png_eerwev"
        alt="logo"
        className="object-contain"
        width={50}
        height={50}
      />
      <h4 className="text-4xl sm:text-5xl text-[#918283] ml-[-0.5rem] relative top-[2px]">
        Punky Pet
      </h4>
    </Link>
  );
}