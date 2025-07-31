import Image from 'next/image';
import React from 'react';

const RedesSocialesDesktop = () => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center py-6 px-4">
      {/* Íconos más grandes */}

      {/* Texto más grande */}
      <div className="flex items-center justify-center gap-3 mt-3">
        <Image src="/icons/facebook.png" alt="Facebook" width={40} height={40} />
        <h5 className="text-[#2C4B4D] text-[18px] tracking-wide">SEGUINOS</h5>
        <h5 className="text-[#2C4B4D] font-bold text-[18px] tracking-wider">EN LAS REDES</h5>
        <Image src="/icons/instagram.png" alt="Instagram" width={40} height={40} />
      </div>
    </div>
  );
};

export default RedesSocialesDesktop;
