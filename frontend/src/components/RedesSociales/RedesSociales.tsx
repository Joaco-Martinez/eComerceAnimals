import Image from 'next/image';
import React from 'react';



const RedesSociales = () => {
  return (
    <div className='flex flex-col items-center justify-center  py-4'>
      <div className='flex items-center justify-center gap-2'>
      <Image src="/icons/facebook.png" alt="Facebook" width={30} height={30} />
      <Image src="/icons/instagram.png" alt="Instagram" width={30} height={30} />
      </div>
      <div className='flex items-center justify-center gap-2 mt-2'>
        <h5 className='text-[#2C4B4D] text-[15px]'>SEGUINOS</h5>
        <h5 className='text-[#2C4B4D] font-bold '>EN LAS REDES</h5>
      </div>
    </div>
  );
};

export default RedesSociales;

