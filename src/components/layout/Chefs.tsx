"use client"
import Image from 'next/image'
import React from 'react'
import chefs1 from "../../../public/chef1.png"
import chefs2 from "../../../public/chef2.png"
import chefs3 from "../../../public/chef3.png"
import chefs4 from "../../../public/chef4.png"

const Chefs = () => {
  return (
    <div className='lg:mt-[100px] lg:px-[100px] px-6'>
      <h1 className='text-bordercoloryello text-center font-greatVibes lg:text-[32px] text-[55px] leading-[40px] font-medium'>
        Our Chefs
      </h1>
      <h1 className='font-helvetica font-bold text-center lg:text-[40px] text-[30px] leading-[45px] text-whitetext'>
        <span className='text-bordercoloryello'>Me</span>et Our Chefs
      </h1>
      
      {/* Flex container for chef images */}
      <div className='flex flex-wrap justify-center lg:justify-between gap-6 px-[100px] pt-[30px]'>
        <div className='lg:w-[305px]'>
          <Image src={chefs1} alt="Chef 1" className='w-full h-auto rounded-[6px]' />
          <p className="text-white text-center font-bold mt-2">D. Estwood</p>
          <p className="text-gray-400 text-center text-sm">Chief Chef</p>
        </div>

        <div className='lg:w-[305px]'>
          <Image src={chefs2} alt="Chef 2" className='w-full h-auto rounded-[6px]' />
          <p className="text-white text-center font-bold mt-2">D. Scoriesh</p>
          <p className="text-gray-400 text-center text-sm">Assistant Chef</p>
        </div>

        <div className='lg:w-[305px]'>
          <Image src={chefs3} alt="Chef 3" className='w-full h-auto rounded-[6px]' />
          <p className="text-white text-center font-bold mt-2">M. William</p>
          <p className="text-gray-400 text-center text-sm">Advertising Chef</p>
        </div>

        <div className='lg:w-[305px]'>
          <Image src={chefs4} alt="Chef 4" className='w-full h-auto rounded-[6px]' />
          <p className="text-white text-center font-bold mt-2">J. Doe</p>
          <p className="text-gray-400 text-center text-sm">Pastry Chef</p>
        </div>
      </div>
    </div>
  )
}

export default Chefs
