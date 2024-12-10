import React from 'react';
import Image from 'next/image';

const PickDishScreen = () => {
    return (
        <div className='w-full'>
            <div className='flex flex-col text-center mt-2 font-bold'>
        <h1 className='text-black text-4xl'>This dish is selected</h1>
        </div>
        
        <div className='flex justify-center items-center border-2 border-black w-2/5 h-80 mt-4 mx-auto' >
            <Image 
            src="/images/lilbits.png" 
            alt="logo" 
            width={500} 
            height={500} 
            className='' />
        </div>
        <div className='border-2 border-black text-black flex flex-col w-2/5 mt-1 mx-auto'>
            <h4 className='text-2xl font-bold ml-2 mt-2'>Pesto Pasta</h4>
            <p className='font-bold text-lg ml-2 mt-2'>Ingredients:</p>
            <p className=' ml-2 mt-2'>Lorem ipsum dolor sit amet. Ex illum fuga sed amet voluptas et quisquam pariatur qui voluptatem maiores. Ut mollitia labore a galisum amet 33 accusantium fugiat et tempora Quis.</p>
        </div>
        </div>
    );
}

export default PickDishScreen;