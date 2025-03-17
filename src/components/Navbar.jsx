import React, { useState } from 'react';
import bhoomika from "../assets/bhoomika.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className='sticky top-0 z-50 drop-shadow-sm'>
        <div className='px-8 sm:px-20 flex justify-between items-center bg-white w-full h-22 sm:h-19'>
          <img className='w-22 cursor-pointer' src={bhoomika} alt="Bhoomika Logo" />
          <div className='flex items-center justify-between gap-8'>
            <ul className='hidden lg:flex flex-row lg:gap-8 font-semibold'>
              <a href="/"><li className='cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-cyan-500'>Home</li></a>
              <a href="/about"><li className='cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-cyan-500'>About</li></a>
              <a href="/service"><li className='cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-cyan-500'>Services</li></a>
              <a href="/blogs"><li className='cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-cyan-500'>Blogs</li></a>
              <a href="/career"><li className='cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-cyan-500'>Career</li></a>
              <a href="/contact"><li className='cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-cyan-500'>Contact</li></a>
            </ul>
            <button type="button" className="hidden lg:inline-flex text-gray-900 hover:text-white bg-lime-400 hover:bg-gradient-to-r from-[#04637B] via-cyan-600 to-[#04637B] font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl cursor-pointer">
              Book an Appointment
            </button>
          </div>
          <div className='lg:hidden'>
            {isMenuOpen ? (
              <IoClose className='w-7 h-7 cursor-pointer' onClick={toggleMenu} />
            ) : (
              <GiHamburgerMenu className='w-7 h-7 cursor-pointer' onClick={toggleMenu} />
            )}
          </div>
        </div>

                {/* Mobile Menu (Hidden by default) */}
                <div
          className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg transition-all duration-300 ease-in-out`}
        >
          <ul className='flex flex-col items-center gap-4 py-6 font-semibold text-gray-700'>
            <a href="/"><li className='cursor-pointer hover:text-cyan-600 transition-all duration-300 ease-in-out'>Home</li></a>
            <a href="/about"><li className='cursor-pointer hover:text-cyan-600 transition-all duration-300 ease-in-out'>About</li></a>
            <a href="/service"><li className='cursor-pointer hover:text-cyan-600 transition-all duration-300 ease-in-out'>Services</li></a>
            <a href="/blogs"><li className='cursor-pointer hover:text-cyan-600 transition-all duration-300 ease-in-out'>Blogs</li></a>
            <a href="/career"><li className='cursor-pointer hover:text-cyan-600 transition-all duration-300 ease-in-out'>Career</li></a>
            <a href="/contact"><li className='cursor-pointer hover:text-cyan-600 transition-all duration-300 ease-in-out'>Contact</li></a>
          </ul>
          <div className='flex justify-center pb-6'>
          <button type="button" className="text-gray-900 hover:text-white bg-lime-400 hover:bg-gradient-to-r from-[#04637B] via-cyan-600 to-[#04637B] font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl cursor-pointer">
              Book an Appointment
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;