import React from 'react';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div>
    <div className="flex justify-center items-center mt-6">
    <div className='flex flex-col items-center justify-center border-2 border-black w-2/4 h-80'>
        <Image 
        src="/images/lilbits.png" 
        alt="logo" 
        width={500} 
        height={500}
        className='' />
      </div>
    </div>

        <div className='flex justify-center items-center'>
            <div className='text-center justify-center border-2 border-black w-1/4 h-72 mt-4'>
                <p className='text-black mt-2 text-lg'>Find your order</p>

                <div className='mt-16'>
                    <p className='text-black'>Please enter your email</p>
                    <input 
                    type="email" 
                    placeholder="Email"
                    className='px-4 py-2 rounded-md mt-2 text-black'
                    />
                    
                </div>

            </div>
            <div className='text-center justify-center border-2 border-black w-1/4 h-72 mt-4 ml-4'>
                <p className='text-black mt-2 text-lg'>Order</p>

                
            </div>
        </div>
        </div>
  );
};

export default HomePage;