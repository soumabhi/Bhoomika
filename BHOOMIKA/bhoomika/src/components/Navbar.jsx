import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import bhoomika from "../assets/bhoomika.png";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle hamburger menu toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility on click
  };

  return (
    <nav className="sticky top-0 z-50 drop-shadow-sm">
      <div className="px-8 sm:px-20 flex justify-between items-center bg-white w-full h-22 sm:h-19">
        <img className="w-22 cursor-pointer" src={bhoomika} alt="Bhoomika" />
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-row md:gap-7 lg:gap-15 font-semibold">
          <li className="cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-lime-500">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-lime-500">
            <Link to="/about">About</Link>
          </li>
          <li className="cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-lime-500">
            <Link to="/service">Services</Link>
          </li>
          <li className="cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-lime-500">
            Blogs
          </li>
          <li className="cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-lime-500">
            <Link to="/carear">Career</Link>
          </li>
          <li className="cursor-pointer md:hover:scale-105 lg:hover:scale-120 transition-all duration-300 ease-in-out hover:text-lime-500">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Book Appointment Button */}
        <button
          type="button"
          className="hidden lg:inline-flex text-gray-900 bg-[#F7BE38] hover:bg-lime-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl cursor-pointer"
        >
          Book an Appointment
        </button>

        {/* Hamburger Menu Icon for Mobile View */}
        <GiHamburgerMenu
          className="md:hidden w-7 h-7 cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center py-4 bg-white">
          <Link to="/" className="py-2 text-xl font-semibold hover:text-lime-500">
            Home
          </Link>
          <Link to="/about" className="py-2 text-xl font-semibold hover:text-lime-500">
            About
          </Link>
          <Link to="/service" className="py-2 text-xl font-semibold hover:text-lime-500">
            Services
          </Link>
          <Link to="/blogs" className="py-2 text-xl font-semibold hover:text-lime-500">
            Blogs
          </Link>
          <Link to="/carear" className="py-2 text-xl font-semibold hover:text-lime-500">
            Career
          </Link>
          <Link to="/contact" className="py-2 text-xl font-semibold hover:text-lime-500">
            Contact
          </Link>
          <button
            type="button"
            className="mt-4 text-gray-900 bg-[#F7BE38] hover:bg-lime-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl cursor-pointer"
          >
            Book an Appointment
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
