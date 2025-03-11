import React from 'react';
import bhoomika from "../assets/bhoomika.png";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <>
      <nav className='sticky top-0 z-50 drop-shadow-sm'>
        <div className='px-8 sm:px-20 flex justify-between items-center bg-white w-full h-22 sm:h-19'>
            <img className='w-22 cursor-pointer' src={bhoomika} alt="" />
            <ul className='hidden md:flex flex-row md:gap-7 lg:gap-15 font-semibold'>
              <li className='cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-lime-500'>Home</li>
              <li className='cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-lime-500'>About</li>
              <li className='cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-lime-500'>Services</li>
              <li className='cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-lime-500'>Blogs</li>
              <li className='cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-lime-500'>Career</li>
              <li className='cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-lime-500'>Contact</li>
            </ul>
            <button type="button" class="hidden lg:inline-flex text-gray-900 bg-[#F7BE38] hover:bg-lime-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl cursor-pointer">
              Book an Appointment
            </button>
            <GiHamburgerMenu className='md:hidden w-7 h-7' />
          </div>
      </nav>
    </>
  )
}

export default Navbar